import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LibraryPieceListSkeleton } from "~/app/_components/skeletons";
import LibraryPieceList from "./piece-list";
import Link from "next/link";
import { DocumentPlusIcon, ViewColumnsIcon } from "@heroicons/react/20/solid";
import Breadcrumbs from "~/app/_components/breadcrumb";

// TODO: recently practiced, practice plan for the day, spots, pieces

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    return redirect("/login");
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Library
        </h1>
      </div>
      <div className="flex w-full flex-col gap-2 sm:container sm:flex-row sm:items-center sm:justify-start sm:gap-4">
        <div className="flex">
          <Breadcrumbs
            breadcrumbs={[{ label: "Library", href: "/library", active: true }]}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 ">
        <div className="flex flex-col">
          <h2 className="py-1 text-center text-2xl font-bold">
            Practicing Today
          </h2>
        </div>
        <div className="flex flex-col border-t border-neutral-700/10 pt-2 sm:pt-4 md:border-l md:border-t-0 md:pt-0">
          <Suspense fallback={<LibraryPieceListSkeleton />}>
            <LibraryPieceList />
          </Suspense>
          <div className="mt-4 flex w-full flex-col gap-4 p-4 sm:flex-row">
            <Link
              className="focusable flex flex-grow items-center justify-center gap-2 rounded-xl bg-amber-700/10 px-6 py-3 text-center font-medium text-amber-700 hover:bg-amber-700/20"
              href="/library/pieces"
            >
              <ViewColumnsIcon className="inline h-6 w-6" />
              All Pieces
            </Link>
            <Link
              className="focusable flex flex-grow items-center justify-center gap-2 rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-700/20"
              href="/library/pieces/create"
            >
              <DocumentPlusIcon className="inline h-6 w-6" />
              New Piece
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
