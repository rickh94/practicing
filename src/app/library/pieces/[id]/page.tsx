import { notFound } from "next/navigation";
import Breadcrumbs from "~/app/_components/breadcrumb";
import type { BasicPiece, BasicSpot } from "~/lib/validators/library";
import { api } from "~/trpc/server";

export default async function SinglePiece({
  params,
}: {
  params: { id: string };
}) {
  const piece = await api.library.getPieceById.query({
    id: params.id,
  });
  if (!piece) {
    notFound();
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
          {piece.title}
        </h1>
      </div>
      <div className="flex w-full items-center justify-start sm:container">
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
      <div className="relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-5xl md:grid-cols-2">
        <PieceInfoDisplay piece={piece} />
        <Spots spots={piece.spots} />
      </div>
    </>
  );
}

// TODO: add edit for a piece
function PieceInfoDisplay({ piece }: { piece: BasicPiece }) {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">
          About this Piece
        </h2>
      </div>
      <dl className="divide-y divide-neutral-700 border-y border-neutral-700">
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
                className="focusable block flex-grow rounded-xl bg-amber-700/10 px-2 py-2 text-center font-medium text-amber-700 hover:bg-amber-700/20"
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

function Spots({ spots }: { spots: BasicSpot[] }) {
  return (
    <div>
      <div className="flex flex-col">
        <h2 className="py-1 text-center text-2xl font-bold">Spots</h2>
      </div>
      <div>
        {spots.map((spot) => (
          <div key={spot.id}>{JSON.stringify(spot)}</div>
        ))}
      </div>
    </div>
  );
}
