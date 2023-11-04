"use client";

import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  AddAudioPrompt,
  AddNotesPrompt,
  AddTextPrompt,
} from "~/app/library/pieces/prompts";
import {
  type CreateAudioPrompt,
  type CreateNotesPrompt,
  type CreateSpotWithPrompts,
  type CreateTextPrompt,
  createSpotWithPrompts,
} from "~/lib/validators/library";
import { api } from "~/trpc/react";

export default function SpotCreationForm({ pieceId }: { pieceId: string }) {
  const { control, handleSubmit, formState, setValue, getValues, reset } =
    useForm<CreateSpotWithPrompts>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(createSpotWithPrompts),
      defaultValues: {
        name: "",
        order: 1,
        measures: "",
        audioPrompt: null,
        textPrompt: null,
        notesPrompt: null,
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

  function onSubmit(data: CreateSpotWithPrompts) {
    mutate({ pieceId, spot: data });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <label
              className="text-sm font-medium leading-6 text-neutral-900"
              htmlFor={field.name}
            >
              Spot Name
            </label>
            <input
              {...field}
              id={field.name}
              className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
            />
            {fieldState.error && (
              <p className="text-xs text-red-400">{fieldState.error.message}</p>
            )}
          </div>
        )}
        name="name"
        control={control}
      />
      <div className="flex gap-2">
        <Controller
          render={({ field, fieldState }) => (
            <div className="flex w-1/2 flex-col">
              <label
                className="text-sm font-medium leading-6 text-neutral-900"
                htmlFor={field.name}
              >
                Spot Order
              </label>
              <input
                {...field}
                type="number"
                id={field.name}
                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
              />
              {fieldState.error && (
                <p className="text-xs text-red-400">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
          name="order"
          control={control}
        />
        <Controller
          render={({ field, fieldState }) => (
            <div className="flex w-1/2 flex-col">
              <label
                className="text-sm font-medium leading-6 text-neutral-900"
                htmlFor={field.name}
              >
                Spot Measures
              </label>
              <input
                {...field}
                id={field.name}
                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
              />
              {fieldState.error && (
                <p className="text-xs text-red-400">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
          name="measures"
          control={control}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <h4 className="text-sm font-medium leading-6 text-neutral-900">
            Prompts (optional)
          </h4>
          <p className="text-sm italic">
            Add small prompts to help you play this spot correctly
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <AddAudioPrompt
            save={(data: CreateAudioPrompt) => {
              setValue("audioPrompt", data);
            }}
            item={getValues("audioPrompt")}
          />
          <AddTextPrompt
            save={(data: CreateTextPrompt) => {
              setValue("textPrompt", data);
            }}
            item={getValues("textPrompt")}
          />
          <AddNotesPrompt
            save={(data: CreateNotesPrompt) => {
              setValue("notesPrompt", data);
            }}
            item={getValues("notesPrompt")}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse justify-start gap-4 pt-4">
        <button
          disabled={!formState.isValid}
          type="submit"
          className={`focusable flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-lg font-semibold  transition duration-200 ${
            formState.isValid
              ? "bg-emerald-700/10 text-emerald-800 hover:bg-emerald-700/20"
              : "bg-neutral-700/50 text-neutral-800"
          }`}
        >
          <FolderPlusIcon className="inline h-6 w-6" />
          {isCreating ? "Saving..." : "Save"}
        </button>
        <Link
          className="focusable rounded-xl bg-amber-700/10 px-5 py-3 text-lg font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
          href={`/library/pieces/${pieceId}`}
        >
          ← Go Back
        </Link>
      </div>
    </form>
  );
}
