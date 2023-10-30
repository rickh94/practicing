"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { type z } from "zod";
import { createPieceData } from "~/lib/validators/library";
import { api } from "~/trpc/react";

type CreatePieceData = z.infer<typeof createPieceData>;

export default function CreatePieceForm() {
  const { control, handleSubmit, formState } = useForm<CreatePieceData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(createPieceData),
    defaultValues: {
      title: "",
      description: "",
      composer: "",
      recordingLink: "",
      practiceNotes: "",
    },
  });
  const router = useRouter();
  const { mutate, isLoading: isUpdating } = api.library.createPiece.useMutation(
    {
      onSuccess: (data) => {
        if (!data?.[0]) {
          toast.error("Missing data in return");
          return;
        }
        router.push(`/library/pieces/${data[0].id}`);
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

  function onSubmit(data: CreatePieceData) {
    mutate(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="divide-y divide-neutral-700  border-y border-neutral-700">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="flex h-full w-full items-center">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Title
                </label>
              </div>
              <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id={field.name}
                  placeholder="Piece Title"
                  {...field}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />
        <Controller
          name="composer"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="flex h-full w-full items-center">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Composer
                </label>
              </div>
              <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id={field.name}
                  placeholder="Composer"
                  {...field}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="flex h-full w-full items-center">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Description
                </label>
              </div>
              <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                <textarea
                  id={field.name}
                  placeholder="Description of your piece"
                  {...field}
                  className="focusable h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />
        <Controller
          name="recordingLink"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="flex h-full w-full items-center">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Link to Recording
                </label>
              </div>
              <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id={field.name}
                  placeholder="Recording Link"
                  {...field}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />
        <Controller
          name="practiceNotes"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="flex h-full w-full items-center">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Practice Notes
                </label>
              </div>
              <div className="text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                <textarea
                  id={field.name}
                  placeholder="Notes for Practicing"
                  {...field}
                  className="focusable h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            </div>
          )}
        />
      </div>
      <div className="flex flex-row-reverse justify-start gap-4 py-4">
        <button
          disabled={!formState.isValid}
          type="submit"
          className={`focusable rounded-xl px-4 py-2 font-semibold  transition duration-200 ${formState.isValid
              ? "bg-emerald-700/10 text-emerald-800 hover:bg-emerald-700/20"
              : "bg-neutral-700/50 text-neutral-800"
            }`}
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <Link
          className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
          href="/library/pieces"
        >
          Go Back
        </Link>
      </div>
    </form>
  );
}
