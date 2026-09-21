import { db } from "@/db";
import {
  and,
  count,
  eq,
  gte,
  lt,
} from "drizzle-orm";
import type {
  MySqlColumn,
  MySqlTable,
} from "drizzle-orm/mysql-core";

type GetStatsParams = {
  table: MySqlTable;
  userIdColumn: MySqlColumn;
  createdAtColumn: MySqlColumn;
  userId: string;
};

export async function getTableStats({
  table,
  userIdColumn,
  createdAtColumn,
  userId,
}: GetStatsParams) {
  const now = new Date();

  const currentMonthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  );

  const previousMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  );

  const [
    [totalResult],
    [currentMonthResult],
    [previousMonthResult],
  ] = await Promise.all([
    db
      .select({ count: count() })
      .from(table)
      .where(eq(userIdColumn, userId)),

    db
      .select({ count: count() })
      .from(table)
      .where(
        and(
          eq(userIdColumn, userId),
          gte(createdAtColumn, currentMonthStart),
        ),
      ),

    db
      .select({ count: count() })
      .from(table)
      .where(
        and(
          eq(userIdColumn, userId),
          gte(createdAtColumn, previousMonthStart),
          lt(createdAtColumn, currentMonthStart),
        ),
      ),
  ]);

  const total = totalResult.count;
  const currentMonth = currentMonthResult.count;
  const previousMonth = previousMonthResult.count;

  const monthChange =
    previousMonth === 0
      ? currentMonth > 0
        ? 100
        : 0
      : Math.round(
          ((currentMonth - previousMonth) / previousMonth) * 100,
        );

  return {
    total,
    monthChange,
  };
}
