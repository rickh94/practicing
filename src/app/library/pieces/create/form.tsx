"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { pieceFormData, type PieceFormData } from "~/lib/validators/library";
import { api } from "~/trpc/react";
import PieceFormFields from "~/app/_components/forms/piece-form";

export default function CreatePieceForm() {
  const { register, control, handleSubmit, formState } = useForm<PieceFormData>(
    {
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(pieceFormData),
      defaultValues: {
        title: "",
        description: "",
        composer: "",
        recordingLink: "",
        practiceNotes: "",
        spots: [],
      },
    },
  );

  // TODO: show quota error
  const router = useRouter();
  const { mutate, isLoading: isUpdating } = api.library.createPiece.useMutation(
    {
      onSuccess: (data) => {
        if (!data) {
          toast.error("Missing data in return");
          return;
        }
        router.push(`/library/pieces/${data.id}`);
        router.refresh();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Could not create piece");
        }
      },
    },
  );

  function onSubmit(data: PieceFormData) {
    mutate(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <PieceFormFields
        register={register}
        control={control}
        formState={formState}
        isUpdating={isUpdating}
      />
    </form>
  );
}
