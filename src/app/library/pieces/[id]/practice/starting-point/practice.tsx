"use client";

import { PencilIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useCallback } from "react";
import toast from "react-hot-toast";
import StartingPoint from "~/app/_components/practice/starting-point";
import { type PieceWithSpots } from "~/lib/validators/library";
import { api } from "~/trpc/react";

// TODO: save practice session on completed

export default function Practice({ piece }: { piece: PieceWithSpots }) {
  const { mutate } = api.library.practicePiece.useMutation({
    onSuccess: () => {
      toast.success("Good job practicing!");
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
    function () {
      mutate({ id: piece.id });
    },
    [mutate, piece.id],
  );

  return (
    <>
      {piece.measures && piece.beatsPerMeasure ? (
        <StartingPoint
          pieceMeasures={piece.measures}
          pieceBeats={piece.beatsPerMeasure}
          preconfigured={true}
          onCompleted={onCompleted}
          pieceHref={`/library/pieces/${piece.id}`}
        />
      ) : (
        <div className="sm:mx-auto sm:max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">
            Missing Piece Properties
          </h1>
          <div>
            You need to update your piece with the number of measures and the
            number of beats per measure.
          </div>
          <div className="flex px-4 py-4">
            <Link
              href={`/library/pieces/${piece.id}/edit`}
              className="focusable flex items-center justify-center gap-1 rounded-xl bg-amber-700/10 px-8 py-3 text-xl font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
            >
              <PencilIcon className="-ml-1 h-6 w-6" />
              Edit Piece
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
