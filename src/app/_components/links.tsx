import { BookOpenIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { UserIcon, UserMinusIcon } from "@heroicons/react/20/solid";

const linkClasses =
  "focusable flex items-center gap-2 rounded-xl bg-neutral-700/10 px-6 py-4 h-14 font-semibold text-neutral-700 transition-all duration-200 hover:bg-neutral-700/20";

export function BackLink({ to, text }: { to?: string; text?: string }) {
  return (
    <Link className={linkClasses} href={to ?? "/error"}>
      ← {text ?? "MISSING PROP"}
    </Link>
  );
}

export function BackToHome() {
  return <BackLink to="/" text="Back Home" />;
}

export function LibraryLink() {
  return (
    <Link className={linkClasses} href="/library">
      <BookOpenIcon className="inline h-6 w-6" />
      Library
    </Link>
  );
}
export function AccountLink() {
  return (
    <Link href="/account" className={linkClasses}>
      <UserIcon className="inline h-6 w-6" />
      <span>Account</span>
    </Link>
  );
}

export function LoginLink() {
  return (
    <Link className={linkClasses} href="/signin">
      Login →
    </Link>
  );
}

export function LogoutLink() {
  return (
    <Link className={linkClasses} href="/api/auth/signout">
      <UserMinusIcon className="inline h-6 w-6" />
      Logout
    </Link>
  );
}
