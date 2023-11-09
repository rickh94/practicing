"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SpotFormFields from "~/app/_components/forms/spot-form";
import {
  type SpotWithPromptsFormData,
  spotWithPromptsFormData,
  type SpotWithPromptsAndPieceTitle,
} from "~/lib/validators/library";
import { api } from "~/trpc/react";

// TODO: add a way to delete prompts

export default function SpotUpdateForm({
  spot,
}: {
  spot: SpotWithPromptsAndPieceTitle;
}) {
  const { control, handleSubmit, formState, setValue } =
    useForm<SpotWithPromptsFormData>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(spotWithPromptsFormData),
      defaultValues: {
        name: spot.name,
        order: spot.order ?? undefined,
        measures: spot.measures,
        audioPromptUrl: spot.audioPromptUrl ?? "",
        imagePromptUrl: spot.imagePromptUrl ?? "",
        textPrompt: spot.textPrompt ?? "",
        notesPrompt: spot.notesPrompt ?? "",
        stage: spot.stage,
      },
    });

  const router = useRouter();
  const { mutate, isLoading: isUpdating } =
    api.library.updateSpotById.useMutation({
      onSuccess: () => {
        router.refresh();
        router.push(`/library/pieces/${spot.piece.id}/spots/${spot.id}`);
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Could not create spot");
        }
      },
    });

  function onSubmit(data: SpotWithPromptsFormData) {
    console.log(data);
    mutate({ pieceId: spot.piece.id, spotId: spot.id, update: data });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <SpotFormFields
        control={control}
        formState={formState}
        setValue={setValue}
        isUpdating={isUpdating}
        backTo={`/library/pieces/${spot.piece.id}/spots/${spot.id}`}
      />
    </form>
  );
}
