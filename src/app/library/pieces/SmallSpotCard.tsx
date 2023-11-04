import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type { BasicSpot } from "~/lib/validators/library";

export function SmallSpotCard({
  spot,
  pieceId,
}: {
  spot: BasicSpot;
  pieceId: string;
}) {
  return (
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
  );
}
