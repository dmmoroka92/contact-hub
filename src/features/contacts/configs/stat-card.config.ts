import { StatCardType } from "@/app/(protected)/contacts/components/stat-card";
import {
  Building2,
  Star,
  Tag,
  Users
} from "lucide-react";

export const STAT_CONFIG = {
  contacts: {
    title: "Total contacts",
    icon: Users,
    cardClassName: "bg-blue-50/70",
    iconWrapperClassName: "bg-blue-100 text-blue-600",
  },

  companies: {
    title: "Companies",
    icon: Building2,
    cardClassName: "bg-emerald-50/70",
    iconWrapperClassName: "bg-emerald-100 text-emerald-600",
  },

  tags: {
    title: "Tags",
    icon: Tag,
    cardClassName: "bg-violet-50/70",
    iconWrapperClassName: "bg-violet-100 text-violet-600",
  },

  favorites: {
    title: "Favorites",
    icon: Star,
    cardClassName: "bg-amber-50/70",
    iconWrapperClassName: "bg-amber-100 text-amber-600",
  },
} satisfies Record<
  StatCardType,
  {
    title: string;
    icon: typeof Users;
    cardClassName: string;
    iconWrapperClassName: string;
  }
>;