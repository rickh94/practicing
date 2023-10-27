import { PageColumnLayout } from "~/app/_components/page-layout";
import { BackToHome } from "~/app/_components/links";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/20/solid";

// TODO: recently practiced, practice plan for the day, spots, pieces

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return redirect("/login");
  }
  return (
    <>
      <PageColumnLayout
        leftButton={<BackToHome />}
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
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
            Dashboard
          </h1>
        </div>
      </PageColumnLayout>
    </>
  );
}
