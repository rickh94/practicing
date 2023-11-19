"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  type PieceWithSpots,
  type PieceFormData,
  pieceFormData,
} from "~/lib/validators/library";
import { api } from "~/trpc/react";
import PieceFormFields from "~/app/_components/forms/piece-form";

export default function UpdatePieceForm({ piece }: { piece: PieceWithSpots }) {
  const { control, handleSubmit, formState, register, watch } =
    useForm<PieceFormData>({
      mode: "onBlur",
      reValidateMode: "onChange",
      resolver: zodResolver(pieceFormData),
      defaultValues: pieceFormData.parse(piece),
    });

  const router = useRouter();
  const { mutate, isLoading: isUpdating } = api.library.updatePiece.useMutation(
    {
      onSuccess: () => {
        toast.success("Piece updated");
        router.push(`/library/pieces/${piece.id}`);
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
    mutate({ id: piece.id, update: data });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <PieceFormFields
        register={register}
        control={control}
        formState={formState}
        isUpdating={isUpdating}
        watch={watch}
      />
    </form>
  );
}
