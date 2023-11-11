import { api } from "~/trpc/server";
import PieceList from "./list";
import Pagination from "~/app/_components/pagination";
import { Suspense } from "react";
import { PieceListSkeleton } from "~/app/_components/skeletons";
import Link from "next/link";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import Breadcrumbs from "~/app/_components/breadcrumb";
import { BreadcrumbContainer } from "~/app/_components/containers";

import { type Metadata } from "next";
import { siteTitle } from "~/lib/util";

export const metadata: Metadata = {
  title: `Your Pieces | ${siteTitle}`,
};

// TODO: add ability to track tempo of pieces and spots

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
      <BreadcrumbContainer>
        <div className="flex w-full justify-between">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Library", href: "/library" },
              { label: "Pieces", href: "/library/pieces", active: true },
            ]}
          />
          <Link
            className="focusable flex items-center justify-center gap-2 rounded-xl bg-emerald-700/10 px-6 py-3 text-center font-medium text-emerald-700 hover:bg-emerald-700/20"
            href="/library/pieces/create"
          >
            <DocumentPlusIcon className="inline h-6 w-6" />
            New Piece
          </Link>
        </div>
      </BreadcrumbContainer>
      <Suspense fallback={<PieceListSkeleton />}>
        <PieceList page={currentPage} />
      </Suspense>
      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
