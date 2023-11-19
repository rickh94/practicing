"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SpotFormFields from "~/app/_components/forms/spot-form";
import { type SpotFormData, spotFormData } from "~/lib/validators/library";
import { api } from "~/trpc/react";

export default function SpotCreationForm({ pieceId }: { pieceId: string }) {
  const { handleSubmit, formState, setValue, reset, register, watch } =
    useForm<SpotFormData>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(spotFormData),
      defaultValues: {
        name: "",
        order: 1,
        measures: "",
        audioPromptUrl: "",
        textPrompt: "",
        notesPrompt: "",
        imagePromptUrl: "",
        stage: "repeat",
      },
    });

  const router = useRouter();
  const { mutate, isLoading: isCreating } =
    api.library.addSpotToPiece.useMutation({
      onSuccess: (data) => {
        if (!data) {
          toast.error("Missing data in return");
          return;
        }
        router.refresh();
        reset();
        setValue("textPrompt", "");
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
    mutate({ pieceId, spot: data });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <SpotFormFields
        formState={formState}
        setValue={setValue}
        isUpdating={isCreating}
        backTo={`/library/pieces/${pieceId}`}
        register={register}
        watch={watch}
      />
    </form>
  );
}
