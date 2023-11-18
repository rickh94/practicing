import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import {
  BreadcrumbContainer,
  NarrowPageContainer,
} from "~/app/_components/containers";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { SmallSpotCard } from "~/app/library/pieces/SmallSpotCard";
import { PieceSpotsSkeleton } from "~/app/_components/skeletons";
import type { ResolvingMetadata, Metadata } from "next";
import { siteTitle } from "~/lib/util";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const piece = await api.library.checkForPiece.query({
    id: params.id,
  });

  return {
    title: `Repeat Practice - ${piece?.title} | ${siteTitle}`,
    openGraph: null,
  };
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const piece = await api.library.checkForPiece.query({
    id,
  });
  if (!piece) {
    return notFound();
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          Repeat Practice | {piece.title}
        </h1>
      </div>
      <BreadcrumbContainer>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Library", href: "/library" },
            { label: "Pieces", href: "/library/pieces" },
            {
              label: piece.title,
              href: `/library/pieces/${piece.id}`,
            },
            {
              label: "Repeat Practice",
              href: `/library/pieces/${piece.id}/practice/repeat`,
              active: true,
            },
          ]}
        />
      </BreadcrumbContainer>
      <NarrowPageContainer>
        <Suspense fallback={<PieceSpotsSkeleton extraClasses="col-span-3" />}>
          <PracticeSpotList pieceId={piece.id} />
        </Suspense>
      </NarrowPageContainer>
    </>
  );
}

export async function PracticeSpotList({ pieceId }: { pieceId: string }) {
  const spots = await api.library.getSpotsForPiece.query({ pieceId });
  return (
    <div className="w-full rounded-xl bg-neutral-700/5 p-4">
      <div className="flex flex-col pb-4">
        <h2 className="py-1 text-center text-2xl font-bold">
          Choose a spot to Repeat Practice
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {spots
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((spot) => (
            <li key={spot.id}>
              <SmallSpotCard spot={spot} pieceId={pieceId} practice />
            </li>
          ))}
        <li>
          <Link
            href={`/library/pieces/${pieceId}/spots/add`}
            className="focusable flex h-full items-center justify-between rounded-xl border border-dashed border-neutral-500 bg-white/50 px-4 py-6 text-neutral-700 hover:bg-white/90 hover:text-black"
          >
            <div className="flex h-full flex-grow flex-col items-center justify-center">
              <h3 className="text-lg font-bold">Or Add a New Spot</h3>
            </div>
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
