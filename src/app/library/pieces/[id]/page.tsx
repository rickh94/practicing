import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import {
  BreadcrumbContainer,
  TwoColumnPageContainer,
} from "~/app/_components/containers";
import type { BasicPiece, BasicSpot } from "~/lib/validators/library";
import { api } from "~/trpc/server";
import { SmallSpotCard } from "../SmallSpotCard";
import ConfirmDeletePiece from "~/app/_components/pieces/confirm-delete-piece";
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
    title: `${piece?.title} | ${siteTitle}`,
  };
}

// TODO: add display of tempo and goal tempo
// TODO: make it prettier

export default async function SinglePiece({
  params,
}: {
  params: { id: string };
}) {
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
                active: true,
              },
            ]}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Link
            href={`/library/pieces/${piece.id}/practice/starting-point`}
            className="focusable flex items-center justify-center gap-1 rounded-xl bg-green-700/10 px-4 py-2 font-semibold text-green-800  transition duration-200 hover:bg-green-700/20"
          >
            <PlayIcon className="-ml-1 h-5 w-5" />
            Practice
          </Link>
          <Link
            href={`/library/pieces/${piece.id}/edit`}
            className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-4 py-2 font-semibold  text-amber-800 transition duration-200 hover:bg-amber-700/20"
          >
            <PencilIcon className="-ml-1 h-5 w-5" />
            Edit
          </Link>
          <ConfirmDeletePiece pieceId={piece.id} title={piece.title} />
        </div>
      </BreadcrumbContainer>
      <TwoColumnPageContainer>
        <PieceInfoDisplay piece={piece} />
        <Spots spots={piece.spots} pieceId={piece.id} />
      </TwoColumnPageContainer>
    </>
  );
}

// TODO: add edit for a piece
function PieceInfoDisplay({ piece }: { piece: BasicPiece }) {
  return (
    <div className="rounded-xl bg-neutral-700/5 p-4">
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">
          About this Piece
        </h2>
      </div>
      <dl className="divide-y divide-neutral-700 border-t border-neutral-700">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-900">
            Title
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            {piece.title}
          </dd>
        </div>
        {piece.composer && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-900">
              Composer
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {piece.composer}
            </dd>
          </div>
        )}
        {piece.measures && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-900">
              Measures
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {piece.measures}
            </dd>
          </div>
        )}
        {piece.beatsPerMeasure && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-900">
              Beats per Measure
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {piece.beatsPerMeasure}
            </dd>
          </div>
        )}
        {piece.description && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-900">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {piece.description}
            </dd>
          </div>
        )}
        {piece.practiceNotes && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-900">
              Practice Notes
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {piece.practiceNotes}
            </dd>
          </div>
        )}
        {piece.recordingLink && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-900">
              Recording
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              <a
                href={piece.recordingLink}
                target="_blank"
                rel="noreferrer noopener"
                className="focusable block flex-grow rounded-xl bg-amber-700/10 px-2 py-2 text-center text-lg font-medium text-amber-700 hover:bg-amber-700/20"
              >
                Click to Listen
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

// TODO: add stage display component and information about practice stages
function Spots({ spots, pieceId }: { spots: BasicSpot[]; pieceId: string }) {
  return (
    <div className="rounded-xl bg-neutral-700/5 p-4">
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
        <li>
          <Link
            href={`/library/pieces/${pieceId}/spots/add`}
            className="focusable flex h-full items-center justify-between rounded-xl border border-dashed border-neutral-500 bg-white/50 px-4 py-6 text-neutral-700 hover:bg-white/90 hover:text-black"
          >
            <div className="flex h-full flex-grow flex-col items-center justify-center">
              <h3 className="text-lg font-bold">Add Spot</h3>
            </div>
            <ArrowTopRightOnSquareIcon className="h-6 w-6" />
            <span className="sr-only">Create Spot</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
