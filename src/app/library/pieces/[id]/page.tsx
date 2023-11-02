import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import type { BasicPiece, BasicSpot } from "~/lib/validators/library";
import { api } from "~/trpc/server";

// TODO: implement edit and delete for pieces

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
      <div className="flex w-full flex-col gap-2 sm:container sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
            href={`/library/pieces/${piece.id}/edit`}
            className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
          >
            <PencilIcon className="h-6 w-6" />
            Edit
          </Link>
          <button
            type="button"
            className="focusable flex items-center justify-center gap-1 rounded-xl bg-red-700/10 px-4 py-2 font-semibold text-red-800  transition duration-200 hover:bg-red-700/20"
          >
            <TrashIcon className="h-6 w-6" />
            Delete
          </button>
        </div>
      </div>
      <div className="relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-5xl md:grid-cols-2">
        <PieceInfoDisplay piece={piece} />
        <Spots spots={piece.spots} pieceId={piece.id} />
      </div>
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
              <Link
                href={`/library/pieces/${pieceId}/spots/${spot.id}`}
                className="focusable flex justify-between rounded-xl border border-neutral-500 bg-white/80 px-4 py-2 text-neutral-700 hover:bg-white hover:text-black"
              >
                <div className="flex flex-grow flex-col">
                  <h3 className="text-lg font-bold">{spot.name}</h3>
                  <p className="text-sm">
                    Measures: <em className="italic">{spot.measures}</em>
                  </p>
                  <p className="text-sm">
                    Stage: <em className="italic">{spot.stage}</em>
                  </p>
                </div>
                <ArrowTopRightOnSquareIcon className="mt-4 h-6 w-6" />
                <span className="sr-only">View Spot</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
