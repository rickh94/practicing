import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Stage } from "@components/pieces/spot-stage";
import type { BasicSpot } from "~/lib/validators/library";

export function SmallSpotCard({
  spot,
  pieceId,
  practice = false,
}: {
  spot: BasicSpot;
  pieceId: string;
  practice?: boolean;
}) {
  return (
    <Link
      href={
        practice
          ? `/library/pieces/${pieceId}/spots/${spot.id}/practice/repeat`
          : `/library/pieces/${pieceId}/spots/${spot.id}`
      }
      className="focusable flex justify-between rounded-xl border border-neutral-500 bg-white/80 px-4 py-2 text-neutral-700 hover:bg-white hover:text-black"
    >
      <div className="flex flex-grow flex-col">
        <h3 className="text-lg font-bold">{spot.name}</h3>
        <div className="inline text-sm">
          Measures: <em className="italic">{spot.measures}</em>
        </div>
        <div className="flex flex-wrap gap-1 text-sm">
          Stage: <Stage stageName={spot.stage} />
        </div>
      </div>
      <ArrowTopRightOnSquareIcon className="mt-4 h-6 w-6" />
      <span className="sr-only">View Spot</span>
    </Link>
  );
}
