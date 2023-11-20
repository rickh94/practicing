"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SpotFormFields from "~/app/_components/forms/spot-form";
import {
  type SpotFormData,
  spotFormData,
  type SpotWithPieceInfo,
} from "~/lib/validators/library";
import { api } from "~/trpc/react";

// TODO: add a way to delete prompts

export default function SpotUpdateForm({ spot }: { spot: SpotWithPieceInfo }) {
  const { handleSubmit, formState, setValue, register, watch } =
    useForm<SpotFormData>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(spotFormData),
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
        router.push(`/library/pieces/${spot.piece.id}/spots/${spot.id}`);
        router.refresh();
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

  function onSubmit(data: SpotFormData) {
    console.log(data);
    mutate({ pieceId: spot.piece.id, spotId: spot.id, update: data });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <SpotFormFields
        formState={formState}
        setValue={setValue}
        isUpdating={isUpdating}
        backTo={`/library/pieces/${spot.piece.id}/spots/${spot.id}`}
        register={register}
        watch={watch}
        showStage
      />
    </form>
  );
}
