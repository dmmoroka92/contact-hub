import { Bell, Search } from "lucide-react";

import UserMenu from "./user-menu";
import { AuthUser } from "@/types/auth";

type TopBarProps = {
  user: AuthUser
};

export default function TopBar({
  user,
}: TopBarProps) {
  return (
    <header
      className="
        flex h-16 shrink-0 items-center justify-between
        border-b border-slate-200
        bg-white px-7
      "
    >
      {/* Search */}
      <div className="relative w-full max-w-xl">
        <Search
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-3 top-1/2 size-5
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="search"
          placeholder="Search contacts, companies, tags..."
          className="
            h-10 w-full rounded-lg border-0
            bg-slate-100
            pl-10 pr-4
            text-sm text-slate-900
            outline-none transition
            placeholder:text-slate-500
            focus:bg-white
            focus:ring-2 focus:ring-blue-500/20
          "
        />
      </div>

      {/* Right side */}
      <div className="ml-8 flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative flex size-9 cursor-pointer
            items-center justify-center
            rounded-lg text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <Bell className="size-5" />

          <span
            className="
              absolute right-1.5 top-1.5
              size-2 rounded-full
              bg-red-500
              ring-2 ring-white
            "
          />
        </button>

        <div className="h-7 w-px bg-slate-200" />

        <UserMenu user={user} />
      </div>
    </header>
  );
}
