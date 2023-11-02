import { DocumentMagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { type PieceForList } from "~/lib/validators/library";

// TODO: maybe allow image or icon for pieces
export default function PieceCard({ piece }: { piece: PieceForList }) {
  let activeSpotCount = 0;
  let completedSpotCount = 0;

  for (const spot of piece.spots) {
    if (spot.stage === "completed") {
      completedSpotCount++;
    } else {
      activeSpotCount++;
    }
  }
  return (
    <Link
      className="focusable flex rounded-xl bg-neutral-700/10 px-6 py-4 text-neutral-700 hover:bg-neutral-700/20"
      href={`/library/pieces/${piece.id}`}
    >
      <div className="flex flex-1 flex-grow flex-col gap-1">
        <div>
          <strong className="text-xl font-bold">{piece.title}</strong> —{" "}
          {piece.composer}
        </div>
        <div>Active Spots: {activeSpotCount}</div>
        <div>Finished Spots: {completedSpotCount}</div>
      </div>
      <div className="flex flex-grow-0 items-center">
        <div className="sr-only">Click to view</div>
        <DocumentMagnifyingGlassIcon className="h-10 w-10" />
      </div>
    </Link>
  );
}
