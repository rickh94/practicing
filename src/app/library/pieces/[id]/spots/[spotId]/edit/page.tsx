import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import {
  BreadcrumbContainer,
  NarrowPageContainer,
} from "~/app/_components/containers";
import { api } from "~/trpc/server";
import SpotUpdateForm from "./form";
import type { ResolvingMetadata, Metadata } from "next";
import { siteTitle } from "~/lib/util";

export async function generateMetadata(
  { params }: { params: { id: string; spotId: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const spot = await api.library.getSpotById.query({
    pieceId: params.id,
    spotId: params.spotId,
  });

  return {
    title: `Edit ${spot?.name} | ${siteTitle}`,
    openGraph: null,
  };
}
export default async function Page({
  params: { id, spotId },
}: {
  params: { id: string; spotId: string };
}) {
  const spot = await api.library.getSpotById.query({
    pieceId: id,
    spotId,
  });
  if (!spot) {
    return notFound();
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          {spot.piece.title}
        </h1>
      </div>
      <BreadcrumbContainer>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Library", href: "/library" },
            { label: "Pieces", href: "/library/pieces" },
            {
              label: spot.piece.title,
              href: `/library/pieces/${spot.piece.id}`,
            },
            {
              label: spot.name,
              href: `/library/pieces/${spot.piece.id}/spots/${spot.id}`,
            },
            {
              label: "Update",
              href: `/library/pieces/${spot.piece.id}/spots/${spot.id}/edit`,
            },
          ]}
        />
      </BreadcrumbContainer>
      <NarrowPageContainer>
        <div className="col-span-2 flex flex-col gap-2 rounded-xl border border-neutral-500 bg-white/80 p-4 text-neutral-900">
          <div className="flex justify-center">
            <h2 className="text-2xl font-bold">Update Spot</h2>
          </div>
          <SpotUpdateForm spot={spot} />
        </div>
      </NarrowPageContainer>
    </>
  );
}
