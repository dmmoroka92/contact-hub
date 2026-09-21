"use client";

import {
  Building2,
  ContactRound,
  Settings,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";

const navigation = [
  {
    label: "Contacts",
    href: ROUTES.CONTACTS,
    icon: ContactRound,
  },
  {
    label: "Companies",
    href: ROUTES.COMPANIES,
    icon: Building2,
  },
  {
    label: "Tags",
    href: ROUTES.TAGS,
    icon: Tags,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white">
      <div className="flex h-screen flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <Link
            href={ROUTES.CONTACTS}
            className="flex items-center gap-3"
          >
            <div
              className="
                flex size-9 items-center justify-center
                rounded-lg bg-blue-600 text-white
              "
            >
              <Users className="size-5" />
            </div>

            <span className="text-lg font-semibold tracking-tight text-slate-950">
              ContactHub
            </span>
          </Link>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 px-3 py-5">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }
                  `}
                >
                  <Icon className="size-5" />

                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="my-5 border-t border-slate-200" />

          <Link
            href={ROUTES.SETTINGS}
            className={`
              flex items-center gap-3
              rounded-lg px-3 py-2.5
              text-sm font-medium
              transition-colors
              ${
                pathname === ROUTES.SETTINGS
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }
            `}
          >
            <Settings className="size-5" />

            Settings
          </Link>
        </nav>
      </div>
    </aside>
  )
}
