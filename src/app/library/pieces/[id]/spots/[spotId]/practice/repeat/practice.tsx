"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import Repeat from "~/app/_components/practice/repeat";
import { type SpotWithPromptsAndPieceTitle } from "~/lib/validators/library";
import { api } from "~/trpc/react";

export default function Practice({
  spot,
}: {
  spot: SpotWithPromptsAndPieceTitle;
}) {
  const startTime = new Date().getTime();
  const router = useRouter();
  const { mutate } = api.library.repeatPracticeSpot.useMutation({
    onSuccess: () => {
      toast.success("Good job practicing!");
      router.refresh();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Could not update spot");
      }
    },
  });

  const onCompleted = useCallback(
    function (successful: boolean) {
      const durationMinutes = Math.ceil((Date.now() - startTime) / 1000 / 60);
      mutate({
        pieceId: spot.piece.id,
        spotId: spot.id,
        durationMinutes,
        successful,
      });
    },
    [mutate, spot.id, spot.piece.id, startTime],
  );

  return (
    <Repeat
      pieceHref={`/library/pieces/${spot.piece.id}/`}
      onCompleted={onCompleted}
      spot={spot}
    />
  );
}
