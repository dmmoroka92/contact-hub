"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/constants/routes";
import { AuthUser } from "@/types/auth";

type UserMenuProps = {
  user: AuthUser
};

export default function UserMenu({
  user,
}: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleLogout() {
    await authClient.signOut();

    router.push(ROUTES.AUTH.LOGIN);
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="
          flex cursor-pointer items-center gap-2
          rounded-lg p-1
          transition
          hover:bg-slate-50
        "
      >
        <div
          className="
            flex size-9 items-center justify-center
            rounded-full bg-blue-100
            text-sm font-semibold text-blue-600
          "
        >
          {initials}
        </div>

        <ChevronDown
          className={`
            size-4 text-slate-500
            transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2
            w-56 overflow-hidden
            rounded-lg border border-slate-200
            bg-white shadow-lg
          "
        >
          {/* User */}
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-slate-950">
              {user.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-500">
              {user.email}
            </p>
          </div>

          {/* Actions */}
          <div className="p-1.5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push(ROUTES.SETTINGS);
              }}
              className="
                flex w-full cursor-pointer items-center gap-3
                rounded-md px-3 py-2
                text-left text-sm text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <Settings className="size-4" />
              Settings
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex w-full cursor-pointer items-center gap-3
                rounded-md px-3 py-2
                text-left text-sm text-red-600
                transition
                hover:bg-red-50
              "
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}