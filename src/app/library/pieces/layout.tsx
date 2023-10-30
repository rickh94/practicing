import { PageColumnLayout } from "~/app/_components/page-layout";
import { LibraryLink } from "~/app/_components/links";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/20/solid";

// TODO: replace with navigation
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageColumnLayout
      leftButton={<LibraryLink />}
      rightButton={
        <Link
          href="/account"
          className="focusable flex items-center gap-1 rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
        >
          <UserIcon className="inline h-6 w-6" />
          <span>Account</span>
        </Link>
      }
    >
      {children}
    </PageColumnLayout>
  );
}
