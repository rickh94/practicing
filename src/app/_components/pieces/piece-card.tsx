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
      className="focusable block rounded-xl bg-neutral-700/10 px-6 py-4 text-neutral-700 hover:bg-neutral-700/20"
      href={`/library/pieces/${piece.id}`}
    >
      <div>
        <strong className="text-xl font-bold">{piece.title}</strong> —{" "}
        {piece.composer}
      </div>
      <div>Active Spots: {activeSpotCount}</div>
      <div>Finished Spots: {completedSpotCount}</div>
    </Link>
  );
}
