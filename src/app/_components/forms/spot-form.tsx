import {
  type FormState,
  type UseFormSetValue,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import { spotStage, type SpotFormData } from "~/lib/validators/library";
import { FolderPlusIcon } from "@heroicons/react/20/solid";
import {
  AddAudioPrompt,
  AddImagePrompt,
  AddNotesPrompt,
  AddTextPrompt,
} from "~/app/_components/forms/add-prompts";
import { useCallback } from "react";
import { HappyButton } from "@ui/buttons";
import { WarningLink } from "@ui/links";
import { cn, getStageDisplayName } from "~/lib/util";
import chevronDown from "./chevron-down.svg";

export default function SpotFormFields({
  formState,
  isUpdating,
  setValue,
  watch,
  register,
  backTo,
  showStage = false,
}: {
  formState: FormState<SpotFormData>;
  setValue: UseFormSetValue<SpotFormData>;
  watch: UseFormWatch<SpotFormData>;
  register: UseFormRegister<SpotFormData>;
  isUpdating: boolean;
  backTo: string;
  showStage?: boolean;
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
      <div className="grid grid-cols-2 gap-2">
        <div
          className={cn(
            "flex flex-col",
            showStage ? "col-span-1" : "col-span-full",
          )}
        >
          <label
            className="text-sm font-medium leading-6 text-neutral-900"
            htmlFor="name"
          >
            Spot Name
          </label>
          <input
            {...register("name")}
            id="name"
            className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
          />
          {formState.errors.name && (
            <p className="text-xs text-red-400">
              {formState.errors.name.message}
            </p>
          )}
        </div>
        {showStage && (
          <div className="col-span-1 flex flex-col">
            <label
              className="text-sm font-medium leading-6 text-neutral-900"
              htmlFor="stage"
            >
              Stage
            </label>
            <select
              {...register("stage")}
              id="stage"
              className="focusable block h-full w-full rounded-xl border-0 bg-neutral-700/10 py-2 pl-4 pr-12 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
              style={{
                appearance: "none",
                backgroundImage: `url(${(chevronDown as { src: string }).src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem top 50%",
                backgroundSize: "1rem auto",
                WebkitAppearance: "none",
                textIndent: 1,
                textOverflow: "",
              }}
            >
              {spotStage.options.map((stage) => (
                <option key={stage} value={stage}>
                  {getStageDisplayName(stage)}
                </option>
              ))}
            </select>
            {formState.errors.stage && (
              <p className="text-xs text-red-400">
                {formState.errors.stage.message}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex w-1/2 flex-col">
          <label
            className="text-sm font-medium leading-6 text-neutral-900"
            htmlFor="order"
          >
            Spot Order
          </label>
          <input
            type="number"
            id="order"
            {...register("order")}
            className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
          />
          {formState.errors.order && (
            <p className="text-xs text-red-400">
              {formState.errors.order.message}
            </p>
          )}
        </div>
        <div className="flex w-1/2 flex-col">
          <label
            className="text-sm font-medium leading-6 text-neutral-900"
            htmlFor="measures"
          >
            Spot Measures
          </label>
          <input
            id="measures"
            {...register("measures")}
            className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
          />
          {formState.errors.measures && (
            <p className="text-xs text-red-400">
              {formState.errors.measures.message}
            </p>
          )}
        </div>
        <div className="flex w-1/2 flex-col">
          <label
            className="text-sm font-medium leading-6 text-neutral-900"
            htmlFor="current-tempo"
          >
            Current Tempo
          </label>
          <input
            {...register("currentTempo")}
            type="number"
            placeholder="BPM"
            id="current-tempo"
            className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
          />
          {formState.errors.currentTempo && (
            <p className="text-xs text-red-400">
              {formState.errors.currentTempo.message}
            </p>
          )}
        </div>
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
        <div className="grid grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1">
          <AddAudioPrompt
            save={setAudioPromptUrl}
            audioPromptUrl={watch("audioPromptUrl")}
          />
          <AddImagePrompt
            save={setImagePromptUrl}
            imagePromptUrl={watch("imagePromptUrl")}
          />
          <AddTextPrompt
            save={setTextPrompt}
            textPrompt={watch("textPrompt")}
          />
          <AddNotesPrompt
            save={setNotesPrompt}
            notesPrompt={watch("notesPrompt")}
          />
        </div>
      </div>
      <div className="flex flex-row-reverse justify-start gap-4 pt-4">
        <HappyButton disabled={!formState.isValid} type="submit">
          <FolderPlusIcon className="-ml-1 h-6 w-6" />
          {isUpdating ? "Saving..." : "Save"}
        </HappyButton>
        <WarningLink href={backTo}>← Go Back</WarningLink>
      </div>
    </>
  );
}
