import {
  Controller,
  useFieldArray,
  type Control,
  type UseFieldArrayUpdate,
} from "react-hook-form";
import type {
  AudioPromptData,
  TextPromptData,
  PieceFormData,
  NotesPromptData,
  UpdatePieceData,
} from "~/lib/validators/library";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TrashIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
  AddAudioPrompt,
  AddNotesPrompt,
  AddTextPrompt,
} from "~/app/_components/forms/add-prompts";

export function SpotsArray({ control }: { control: Control<PieceFormData> }) {
  const { fields, append, remove, update } = useFieldArray<
    PieceFormData | UpdatePieceData
  >({
    control,
    name: "spots",
  });

  const [parent, enableAnimations] = useAutoAnimate();

  const updateWithoutFlashing: UseFieldArrayUpdate<PieceFormData> = function (
    index,
    data,
  ) {
    enableAnimations(false);
    update(index, data);
    // this needs to be pushed into the next tick. if it runs in the same tick, it
    // animates and does a weird flash thing when it updates, but i want it to animate
    // when a new one is actually added, so i do need to turn the animation back on.
    setTimeout(() => {
      enableAnimations(true);
    }, 1);
  };

  return (
    <>
      <h3 className="pt-2 text-left text-3xl font-bold">Add Practice Spots</h3>
      <ul
        ref={parent}
        className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {fields.map((item, index) => (
          <li
            key={item.id}
            className="flex h-72 flex-col justify-center gap-2 rounded-xl border border-neutral-500 bg-white/80 px-4 text-neutral-700"
          >
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
                    <p className="mt-2 text-sm text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
              name={`spots.${index}.name`}
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
                      id={field.name}
                      className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-sm text-red-600">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
                name={`spots.${index}.order`}
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
                      <p className="mt-2 text-sm text-red-600">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
                name={`spots.${index}.measures`}
                control={control}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-medium leading-6 text-neutral-900">
                Prompts (optional)
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <AddAudioPrompt
                  save={(data: AudioPromptData) =>
                    updateWithoutFlashing(index, {
                      ...item,
                      audioPrompt: data,
                    })
                  }
                  item={item.audioPrompt}
                />
                <AddTextPrompt
                  save={(data: TextPromptData) =>
                    updateWithoutFlashing(index, {
                      ...item,
                      textPrompt: data,
                    })
                  }
                  item={item.textPrompt}
                />
                <AddNotesPrompt
                  save={(data: NotesPromptData) =>
                    updateWithoutFlashing(index, {
                      ...item,
                      notesPrompt: data,
                    })
                  }
                  item={item.notesPrompt}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="focusable flex items-center justify-center gap-1 rounded-xl bg-red-700/10 px-4 py-2 font-semibold text-red-800  transition duration-200 hover:bg-red-700/20"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
          </li>
        ))}
        <li className="flex h-72 flex-col gap-2 rounded-xl border border-dashed border-neutral-500 bg-white/50 px-4 py-2 text-neutral-700 hover:bg-white/90 hover:text-black">
          <button
            className="flex h-full w-full items-center justify-center gap-1 text-2xl font-bold"
            type="button"
            onClick={() =>
              append({
                name: `Spot ${fields.length + 1}`,
                order: fields.length + 1,
                stage: "repeat",
                measures: "mm 1-2",
                audioPrompt: null,
                textPrompt: null,
                notesPrompt: null,
              })
            }
          >
            <PlusIcon className="h-6 w-6" />
            Add a Spot
          </button>
        </li>
      </ul>
    </>
  );
}
