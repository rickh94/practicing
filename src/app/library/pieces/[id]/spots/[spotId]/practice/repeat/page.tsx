import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import { BreadcrumbContainer } from "~/app/_components/containers";
import Practice from "./practice";
import { api } from "~/trpc/server";
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
    title: `Practice ${spot?.name} | ${siteTitle}`,
  };
}

export default async function Page({
  params,
}: {
  params: { id: string; spotId: string };
}) {
  const spot = await api.library.getSpotById.query({
    pieceId: params.id,
    spotId: params.spotId,
  });
  if (!spot) {
    return notFound();
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          {spot.name} | {spot.piece.title}
        </h1>
      </div>
      <BreadcrumbContainer>
        <div className="flex">
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
                label: "Repeat Practice",
                href: `/library/pieces/${spot.piece.id}/spots/${spot.id}/practice/repeat`,
              },
            ]}
          />
        </div>
      </BreadcrumbContainer>
      <Practice spot={spot} />
    </>
  );
}
