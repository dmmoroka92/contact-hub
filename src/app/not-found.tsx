import Link from "next/link";
import { SearchX } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md text-center">
        <div
          className="
            mx-auto mb-6 flex size-12
            items-center justify-center
            rounded-lg border border-slate-200
            bg-white
          "
        >
          <SearchX
            className="size-5 text-slate-600"
            aria-hidden="true"
          />
        </div>

        <p className="mb-2 text-sm font-medium text-slate-500">
          404
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href={ROUTES.CONTACTS}
            className="
              inline-flex items-center justify-center
              rounded-lg bg-slate-950
              px-4 py-2.5
              text-sm font-medium text-white
              transition
              hover:bg-slate-800
              focus:outline-none
              focus:ring-2 focus:ring-slate-400
              focus:ring-offset-2
            "
          >
            Back to contacts
          </Link>
        </div>
      </div>
    </main>
  );
}