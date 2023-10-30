import { BookOpenIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export function BackLink({ to, text }: { to?: string; text?: string }) {
  return (
    <Link
      className="focusable block rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
      href={to ?? "/error"}
    >
      ← {text ?? "MISSING PROP"}
    </Link>
  );
}

export function BackToHome() {
  return <BackLink to="/" text="Back Home" />;
}

export function BackToDashboard() {
  return <BackLink to="/dashboard" text="Dashboard" />;
}

export function LibraryLink() {
  return (
    <Link
      className="focusable  flex items-center gap-2 rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
      href="/library"
    >
      <BookOpenIcon className="inline h-6 w-6" />
      Library
    </Link>
  );
}
