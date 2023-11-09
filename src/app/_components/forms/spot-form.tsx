import Link from "next/link";
import {
  Controller,
  type Control,
  type FormState,
  type UseFormSetValue,
} from "react-hook-form";
import type { SpotWithPromptsFormData } from "~/lib/validators/library";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import {
  AddAudioPrompt,
  AddImagePrompt,
  AddNotesPrompt,
  AddTextPrompt,
} from "~/app/_components/forms/add-prompts";
import { useCallback } from "react";

export default function SpotFormFields({
  control,
  formState,
  isUpdating,
  setValue,
  backTo,
}: {
  control: Control<SpotWithPromptsFormData>;
  formState: FormState<SpotWithPromptsFormData>;
  setValue: UseFormSetValue<SpotWithPromptsFormData>;
  isUpdating: boolean;
  backTo: string;
}) {
  const setAudioPromptUrl = useCallback(
    function (url: string) {
      setValue("audioPromptUrl", url);
    },
    [setValue],
  );
  const setImagePromptUrl = useCallback(
    function (data: string) {
      setValue("imagePromptUrl", data);
    },
    [setValue],
  );
  const setTextPrompt = useCallback(
    function (data: string) {
      setValue("textPrompt", data);
    },
    [setValue],
  );
  const setNotesPrompt = useCallback(
    function (data: string) {
      setValue("notesPrompt", data);
    },
    [setValue],
  );
  return (
    <>
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
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          <Controller
            name="audioPromptUrl"
            control={control}
            render={({ field }) => (
              <AddAudioPrompt
                save={setAudioPromptUrl}
                audioPromptUrl={field.value}
              />
            )}
          />
          <Controller
            name="imagePromptUrl"
            control={control}
            render={({ field }) => (
              <AddImagePrompt
                save={setImagePromptUrl}
                imagePromptUrl={field.value}
              />
            )}
          />
          <Controller
            name="textPrompt"
            control={control}
            render={({ field }) => (
              <AddTextPrompt save={setTextPrompt} textPrompt={field.value} />
            )}
          />
          <Controller
            name="notesPrompt"
            control={control}
            render={({ field }) => (
              <AddNotesPrompt save={setNotesPrompt} notesPrompt={field.value} />
            )}
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
          {isUpdating ? "Saving..." : "Save"}
        </button>
        <Link
          className="focusable rounded-xl bg-amber-700/10 px-5 py-3 text-lg font-semibold text-amber-800  transition duration-200 hover:bg-amber-700/20"
          href={backTo}
        >
          ← Go Back
        </Link>
      </div>
    </>
  );
}
