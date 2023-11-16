"use client";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import PracticeRandomSpots from "~/app/_components/random/tabchooser";
import { type PieceWithSpots } from "~/lib/validators/library";
import { api } from "~/trpc/react";

export default function Practice({ piece }: { piece: PieceWithSpots }) {
  const startTime = new Date().getTime();
  const router = useRouter();
  const { mutate } = api.library.practicePieceSpots.useMutation({
    onSuccess: () => {
      toast.success("Good job practicing!");
      router.refresh();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Could not update piece");
      }
    },
  });

  const onCompleted = useCallback(
    function (spotIds: string[]) {
      const durationMinutes = Math.ceil((Date.now() - startTime) / 1000 / 60);
      mutate({ id: piece.id, durationMinutes, spotIds });
    },
    [mutate, piece.id, startTime],
  );

  const hasSpots = useMemo(
    () => piece.spots && piece.spots.length > 0,
    [piece],
  );

  const hasRandomSpots = useMemo(
    () =>
      piece.spots &&
      piece.spots.filter(
        (spot) => spot.stage !== "repeat" && spot.stage !== "completed",
      ).length > 0,
    [piece],
  );

  // TODO: update so error message apears when there are no spots in the appropriate stage
  // TODO: add onCompleted callback to practice random spots
  return (
    <>
      {hasSpots && hasRandomSpots && (
        <PracticeRandomSpots
          initialSpots={piece.spots.filter(
            (spot) => spot.stage !== "repeat" && spot.stage !== "completed",
          )}
        />
      )}
      {hasSpots && !hasRandomSpots && (
        <div className="sm:mx-auto sm:max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">
            No Spots for Random Practicing
          </h1>
          <div>
            Random practicing is best for spots that you can play well, but
            aren’t comfortable yet. Spots that are completed or haven’t been
            repeat practice yet won’t show up here.
          </div>
          <div className="flex gap-2 py-4">
            <Link
              href={`/library/pieces/${piece.id}`}
              className="focusable flex items-center justify-center gap-1 rounded-xl bg-sky-700/10 px-8 py-3 text-xl font-semibold text-sky-800  transition duration-200 hover:bg-sky-700/20"
            >
              Back to Piece
            </Link>
            <Link
              href={`/library/pieces/${piece.id}/spots/add`}
              className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-8 py-3 text-xl font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
            >
              <DocumentPlusIcon className="-ml-1 h-6 w-6" />
              Add Spots
            </Link>
          </div>
        </div>
      )}
      {!hasSpots && (
        <div className="sm:mx-auto sm:max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">
            No Spots
          </h1>
          <div>
            You don’t have any spots for this piece. You’ll need to add some.
          </div>
          <div className="flex gap-2 py-4">
            <Link
              href={`/library/pieces/${piece.id}`}
              className="focusable flex items-center justify-center gap-1 rounded-xl bg-sky-700/10 px-8 py-3 text-xl font-semibold text-sky-800  transition duration-200 hover:bg-sky-700/20"
            >
              Back to Piece
            </Link>
            <Link
              href={`/library/pieces/${piece.id}/spots/add`}
              className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-8 py-3 text-xl font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
            >
              <DocumentPlusIcon className="-ml-1 h-6 w-6" />
              Add Spots
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function AddSpotsLink({ pieceId }: { pieceId: string }) {
  return (
    <Link
      href={`/library/pieces/${pieceId}/spots/add`}
      className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-8 py-3 text-xl font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
    >
      <DocumentPlusIcon className="-ml-1 h-6 w-6" />
      Add Spots
    </Link>
  );
}
