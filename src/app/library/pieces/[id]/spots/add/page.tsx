import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import {
  BreadcrumbContainer,
  FiveColumnPageContainer,
} from "~/app/_components/containers";
import { api } from "~/trpc/server";
import SpotCreationForm from "./form";
import { Suspense } from "react";
import { SmallSpotCard } from "~/app/library/pieces/SmallSpotCard";
import { PieceSpotsSkeleton } from "~/app/_components/skeletons";

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
          {piece.title}
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
              label: "Add Spot",
              href: `/library/pieces/${piece.id}/spots/add`,
              active: true,
            },
          ]}
        />
      </BreadcrumbContainer>
      <FiveColumnPageContainer>
        <div className="col-span-2 flex flex-col gap-2 rounded-xl border border-neutral-500 bg-white/80 p-4 text-neutral-900">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold">Add Spot</h2>
          </div>
          <SpotCreationForm pieceId={piece.id} />
        </div>
        <Suspense fallback={<PieceSpotsSkeleton extraClasses="col-span-3" />}>
          <SpotList pieceId={piece.id} />
        </Suspense>
      </FiveColumnPageContainer>
    </>
  );
}

export async function SpotList({ pieceId }: { pieceId: string }) {
  const spots = await api.library.getSpotsForPiece.query({ pieceId });
  return (
    <div className="col-span-3 rounded-xl bg-neutral-700/5 p-4">
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">Spots</h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {spots
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((spot) => (
            <li key={spot.id}>
              <SmallSpotCard spot={spot} pieceId={pieceId} />
            </li>
          ))}
      </ul>
    </div>
  );
}
