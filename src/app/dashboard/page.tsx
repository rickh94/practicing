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
        <div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="py-1 text-center text-2xl font-bold">
              Practicing Today
            </h2>
          </div>
          <div className="flex flex-col border-t-2 border-neutral-700 pt-2 sm:pt-4 md:border-l-2 md:border-t-0 md:pt-0">
            <h2 className="py-1 text-center text-2xl font-bold">Your Pieces</h2>
            <div className="flex flex-col gap-4 p-4">
              <Link
                className="focusable block rounded-xl bg-neutral-700/10 px-6 py-4 text-neutral-700 hover:bg-neutral-700/20"
                href="/pieces/4"
              >
                <div>
                  <span className="text-xl font-bold">Allegro</span> — Shinichi
                  Suzuki
                </div>
                <div>Active Spots: 3</div>
                <div>Finished Spots: 1</div>
              </Link>
              <div className="mt-4 flex w-full flex-col gap-4 sm:flex-row">
                <Link
                  className="focusable block flex-grow rounded-xl bg-amber-700/10 px-6 py-3 text-center font-medium text-amber-700 hover:bg-amber-700/20"
                  href="/pieces"
                >
                  View All Pieces
                </Link>
                <Link
                  className="focusable block flex-grow rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-700/20"
                  href="/pieces/create"
                >
                  Create New Piece
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageColumnLayout>
    </>
  );
}
