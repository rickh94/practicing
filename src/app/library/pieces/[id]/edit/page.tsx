import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import { BreadcrumbContainer } from "~/app/_components/containers";
import { api } from "~/trpc/server";
import UpdatePieceForm from "./form";
import type { ResolvingMetadata, Metadata } from "next";
import { siteTitle } from "~/lib/util";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const piece = await api.library.getPieceForUpdate.query({
    id: params.id,
  });

  return {
    title: `Edit ${piece?.title} | ${siteTitle}`,
    openGraph: null,
  };
}

export default async function SinglePiece({
  params,
}: {
  params: { id: string };
}) {
  const piece = await api.library.getPieceForUpdate.query({
    id: params.id,
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
        <div className="flex">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Library", href: "/library" },
              { label: "Pieces", href: "/library/pieces" },
              {
                label: piece.title,
                href: `/library/pieces/${piece.id}`,
              },
              {
                label: "Update",
                href: `/library/pieces/${piece.id}/edit`,
                active: true,
              },
            ]}
          />
        </div>
      </BreadcrumbContainer>
      <div className="w-full sm:mx-auto sm:max-w-6xl">
        <UpdatePieceForm piece={piece} />
      </div>
    </>
  );
}
