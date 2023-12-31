import {
  useFieldArray,
  type Control,
  type UseFieldArrayUpdate,
  type UseFormRegister,
  type FormState,
  type UseFormWatch,
} from "react-hook-form";
import type { PieceFormData, UpdatePieceData } from "~/lib/validators/library";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TrashIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
  AddAudioPrompt,
  AddNotesPrompt,
  AddTextPrompt,
  AddImagePrompt,
} from "~/app/_components/forms/add-prompts";
import { AngryButton } from "@ui/buttons";

export function SpotsArray({
  control,
  register,
  formState,
  watch,
}: {
  watch: UseFormWatch<PieceFormData>;
  formState: FormState<PieceFormData>;
  register: UseFormRegister<PieceFormData>;
  control: Control<PieceFormData>;
}) {
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
            className="flex flex-col justify-center gap-2 rounded-xl border border-neutral-500 bg-white/80 px-4 pb-4 pt-2 text-neutral-700"
          >
            <div className="flex flex-col">
              <label
                className="text-sm font-medium leading-6 text-neutral-900"
                htmlFor={`spots.${index}.name`}
              >
                Spot Name
              </label>
              <input
                id={`spots.${index}.name`}
                type="text"
                {...register(`spots.${index}.name`)}
                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
              />
              {formState.errors.spots?.[index]?.name && (
                <p className="mt-2 text-sm text-red-600">
                  {formState.errors.spots?.[index]?.name?.message}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex w-1/2 flex-col">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={`spots.${index}.order`}
                >
                  Spot Order
                </label>
                <input
                  id={`spots.${index}.order`}
                  type="number"
                  {...register(`spots.${index}.order`)}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {formState.errors.spots?.[index]?.order && (
                  <p className="mt-2 text-sm text-red-600">
                    {formState.errors.spots?.[index]?.order?.message}
                  </p>
                )}
              </div>
              <div className="flex w-1/2 flex-col">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={`spots.${index}.measures`}
                >
                  Spot Measures
                </label>
                <input
                  id={`spots.${index}.measures`}
                  {...register(`spots.${index}.measures`)}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {formState.errors.spots?.[index]?.measures && (
                  <p className="mt-2 text-sm text-red-600">
                    {formState.errors.spots?.[index]?.measures?.message}
                  </p>
                )}
              </div>
              <div className="flex w-1/2 flex-col">
                <label
                  className="text-sm font-medium leading-6 text-neutral-900"
                  htmlFor={`spots.${index}.currentTempo`}
                >
                  Current Tempo
                </label>
                <input
                  type="number"
                  placeholder="BPM"
                  id={`spots.${index}.currentTempo`}
                  {...register(`spots.${index}.currentTempo`)}
                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                />
                {formState.errors.spots?.[index]?.currentTempo && (
                  <p className="text-xs text-red-400">
                    {formState.errors.spots?.[index]?.currentTempo?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-medium leading-6 text-neutral-900">
                Prompts (optional)
              </h4>
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <AddAudioPrompt
                  registerReturn={register(`spots.${index}.audioPromptUrl`)}
                  save={(audioPromptUrl: string) =>
                    updateWithoutFlashing(index, {
                      ...item,
                      audioPromptUrl,
                    })
                  }
                  audioPromptUrl={watch(`spots.${index}.audioPromptUrl`)}
                />
                <AddImagePrompt
                  save={(imagePromptUrl: string) =>
                    updateWithoutFlashing(index, {
                      ...item,
                      imagePromptUrl,
                    })
                  }
                  imagePromptUrl={watch(`spots.${index}.imagePromptUrl`)}
                  registerReturn={register(`spots.${index}.imagePromptUrl`)}
                />
                <AddTextPrompt
                  registerReturn={register(`spots.${index}.textPrompt`)}
                  textPrompt={watch(`spots.${index}.textPrompt`)}
                />
                <AddNotesPrompt
                  registerReturn={register(`spots.${index}.notesPrompt`)}
                  notesPrompt={watch(`spots.${index}.notesPrompt`)}
                />
              </div>
            </div>
            <AngryButton onClick={() => remove(index)}>
              <TrashIcon className="h-4 w-4" />
              Delete
            </AngryButton>
          </li>
        ))}
        <li className="flex h-[21rem] flex-col gap-2 rounded-xl border border-dashed border-neutral-500 bg-white/50 px-4 py-2 text-neutral-700 hover:bg-white/90 hover:text-black">
          <button
            className="flex h-full w-full items-center justify-center gap-1 text-2xl font-bold"
            type="button"
            onClick={() =>
              append({
                name: `Spot ${fields.length + 1}`,
                order: fields.length + 1,
                stage: "repeat",
                measures: "mm 1-2",
                audioPromptUrl: "",
                textPrompt: "",
                notesPrompt: "",
                imagePromptUrl: "",
                currentTempo: null,
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
