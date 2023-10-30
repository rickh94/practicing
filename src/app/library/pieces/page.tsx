import { api } from "~/trpc/server";
import PieceList from "./list";
import Pagination from "~/app/_components/pagination";
import { Suspense } from "react";
import { PieceListSkeleton } from "~/app/_components/skeletons";
import Link from "next/link";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";

export default async function AllPieces({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await api.library.getPiecePages.query();

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800">
          Your Pieces
        </h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full justify-end">
          <Link
            className="focusable flex items-center justify-center rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-700/20"
            href="/library/pieces/create"
          >
            <DocumentPlusIcon className="inline h-6 w-6" />
            New Piece
          </Link>
        </div>
        <Suspense fallback={<PieceListSkeleton />}>
          <PieceList page={currentPage} />
        </Suspense>
        <div className="flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
