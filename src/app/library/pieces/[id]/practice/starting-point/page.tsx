import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import { BreadcrumbContainer } from "~/app/_components/containers";
import Practice from "./practice";
import { api } from "~/trpc/server";
import type { ResolvingMetadata, Metadata } from "next";
import { siteTitle } from "~/lib/util";

export async function generateMetadata(
  { params }: { params: { id: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const piece = await api.library.getPieceById.query({
    id: params.id,
  });

  return {
    title: `Practice ${piece?.title} | ${siteTitle}`,
    openGraph: null,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const piece = await api.library.getPieceById.query({
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
                label: "Practice Starting Point",
                href: `/library/pieces/${piece.id}/practice/starting-point`,
                active: true,
              },
            ]}
          />
        </div>
      </BreadcrumbContainer>
      <Practice piece={piece} />
    </>
  );
}
