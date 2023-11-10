"use client";
import Link from "next/link";
import { Controller, type Control, type FormState } from "react-hook-form";
import { type PieceFormData } from "~/lib/validators/library";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import { SpotsArray } from "~/app/_components/forms/spots-array";

// TODO: reformat and add measures and beats per measure

export default function PieceFormFields({
  control,
  formState,
  isUpdating,
  backTo = "/library/pieces",
}: {
  control: Control<PieceFormData>;
  formState: FormState<PieceFormData>;
  isUpdating: boolean;
  backTo?: string;
}) {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="grid-cols-1 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 ">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Title (required)
                </label>
                <input
                  type="text"
                  id={field.name}
                  placeholder="Piece Title"
                  {...field}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="composer"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Composer
                </label>
                <input
                  type="text"
                  id={field.name}
                  placeholder="Composer"
                  {...field}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>
        <div className="grid-cols-1 px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 md:grid-cols-4 ">
          <Controller
            name="measures"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Number of Measures
                </label>
                <input
                  type="number"
                  id={field.name}
                  placeholder="Measures"
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || undefined)
                  }
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="beatsPerMeasure"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Beats per Measure
                </label>
                <input
                  type="number"
                  id={field.name}
                  placeholder="Beats"
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || undefined)
                  }
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="recordingLink"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="col-span-2 flex w-full flex-col">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Recording Link
                </label>
                <input
                  type="text"
                  id={field.name}
                  placeholder="Reference Recording"
                  {...field}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid-cols-1 px-4 py-2 sm:grid sm:gap-4 sm:px-0 md:grid-cols-2">
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Description
                </label>
                <textarea
                  id={field.name}
                  placeholder="Describe of your piece"
                  {...field}
                  className="focusable h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="practiceNotes"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={field.name}
                >
                  Practice Notes
                </label>
                <textarea
                  id={field.name}
                  placeholder="Things to remember"
                  {...field}
                  className="focusable h-24 w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <SpotsArray control={control} />
      <div className="flex flex-row-reverse justify-start gap-4 py-4">
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
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <Link
          className="focusable rounded-xl bg-amber-700/10 px-5 py-3 text-lg font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
          href={backTo}
        >
          ← Cancel
        </Link>
      </div>
    </>
  );
}
