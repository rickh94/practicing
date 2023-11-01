"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useForm,
  Controller,
  useFieldArray,
  type Control,
  type UseFieldArrayUpdate,
  type FieldArrayWithId,
} from "react-hook-form";
import toast from "react-hot-toast";
import { type z } from "zod";
import {
  type CreateAudioPrompt,
  type CreateNotesPrompt,
  type CreateTextPrompt,
  createAudioPrompt,
  createNotesPrompt,
  createPieceData,
  createTextPrompt,
} from "~/lib/validators/library";
import { api } from "~/trpc/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  TrashIcon,
  PlusIcon,
  FolderPlusIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { workSans } from "~/app/_components/page-layout";
import NotesDisplay from "~/app/_components/AbcNotesDisplay";
import { cn } from "~/app/lib/utils";

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
      spots: [],
    },
  });

  const router = useRouter();
  const { mutate, isLoading: isUpdating } = api.library.createPiece.useMutation(
    {
      onSuccess: (data) => {
        if (!data) {
          toast.error("Missing data in return");
          return;
        }
        router.push(`/library/pieces/${data.id}`);
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
          href="/library/pieces"
        >
          ← Go Back
        </Link>
      </div>
    </form>
  );
}

// TODO: change prompt things to be re-assignable

function SpotsArray({ control }: { control: Control<CreatePieceData> }) {
  const { fields, append, remove, update } = useFieldArray<CreatePieceData>({
    control,
    name: "spots",
  });

  const [parent, enableAnimations] = useAutoAnimate();

  const updateWithoutFlashing: UseFieldArrayUpdate<CreatePieceData> = function (
    index,
    data,
  ) {
    enableAnimations(false);
    update(index, data);
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
              render={({ field }) => (
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
                </div>
              )}
              name={`spots.${index}.name`}
              control={control}
            />
            <div className="flex gap-2">
              <Controller
                render={({ field }) => (
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
                  </div>
                )}
                name={`spots.${index}.order`}
                control={control}
              />
              <Controller
                render={({ field }) => (
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
                  update={updateWithoutFlashing}
                  index={index}
                  item={item}
                />
                <AddTextPrompt
                  update={updateWithoutFlashing}
                  index={index}
                  item={item}
                />
                <AddNotesPrompt
                  update={updateWithoutFlashing}
                  index={index}
                  item={item}
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

function AddAudioPrompt({
  update,
  index,
  item,
}: {
  update: UseFieldArrayUpdate<CreatePieceData>;
  index: number;
  item: FieldArrayWithId<CreatePieceData, "spots">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm<CreateAudioPrompt>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(createAudioPrompt),
    defaultValues: {
      url: item.audioPrompt?.url ?? "",
      description: item.audioPrompt?.description ?? "",
    },
  });

  function onSubmit(data: CreateAudioPrompt) {
    update(index, {
      ...item,
      audioPrompt: data,
    });
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "focusable flex items-center justify-center gap-1 rounded-xl py-2 font-semibold text-yellow-800  transition duration-200 hover:bg-yellow-700/20",
          {
            "bg-yellow-700/10": !item.audioPrompt,
            "bg-yellow-500/50": item.audioPrompt,
          },
        )}
      >
        {item.audioPrompt ? (
          <>
            <span className="sr-only">Checked</span>
            <CheckIcon className="h-4 w-4" />
          </>
        ) : (
          <SpeakerWaveIcon className="h-4 w-4" />
        )}
        Audio
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="back fixed inset-0 bg-neutral-800/30 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${workSans.className}`}
                >
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-neutral-900"
                        >
                          Add Audio Prompt
                        </Dialog.Title>
                        <div className="prose prose-sm prose-neutral mt-2 text-center">
                          Enter the url to an audio file to use as a prompt for
                          remembering this spot.
                        </div>
                        <Controller
                          render={({ field }) => (
                            <div className="flex flex-col">
                              <label
                                className="text-left text-sm font-medium leading-6 text-neutral-900"
                                htmlFor={field.name}
                              >
                                Description
                              </label>
                              <input
                                {...field}
                                id={field.name}
                                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                              />
                            </div>
                          )}
                          name="description"
                          control={control}
                        />
                        <Controller
                          render={({ field }) => (
                            <div className="flex flex-col">
                              <label
                                className="text-left text-sm font-medium leading-6 text-neutral-900"
                                htmlFor={field.name}
                              >
                                Url
                              </label>
                              <input
                                {...field}
                                id={field.name}
                                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                              />
                            </div>
                          )}
                          name="url"
                          control={control}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 px-2 sm:mt-6">
                      <button
                        type="button"
                        className="focusable flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800/20 px-4 py-2 text-lg font-semibold text-amber-700 hover:bg-amber-800/30"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="focusable flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800/20 px-4 py-2 text-lg font-semibold text-emerald-700 hover:bg-emerald-800/30"
                      >
                        <CheckIcon className="h-6 w-6" />
                        Done
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function AddTextPrompt({
  update,
  index,
  item,
}: {
  update: UseFieldArrayUpdate<CreatePieceData>;
  index: number;
  item: FieldArrayWithId<CreatePieceData, "spots">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm<CreateTextPrompt>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(createTextPrompt),
    defaultValues: {
      text: item.textPrompt?.text ?? "",
      description: item.textPrompt?.description ?? "",
    },
  });

  function onSubmit(data: CreateTextPrompt) {
    update(index, {
      ...item,
      textPrompt: data,
    });
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "focusable flex items-center justify-center gap-1 rounded-xl py-2 font-semibold text-lime-800  transition duration-200 hover:bg-lime-700/20",
          {
            "bg-lime-700/10": !item.textPrompt,
            "bg-lime-500/50": item.textPrompt,
          },
        )}
      >
        {item.textPrompt ? (
          <>
            <span className="sr-only">Checked</span>
            <CheckIcon className="h-4 w-4" />
          </>
        ) : (
          <DocumentTextIcon className="h-4 w-4" />
        )}
        Text
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="back fixed inset-0 bg-neutral-800/30 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${workSans.className}`}
                >
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-neutral-900"
                        >
                          Add Text Prompt
                        </Dialog.Title>
                        <div className="prose prose-sm prose-neutral mt-2 text-center">
                          Enter some text to remind yourself about this spot.
                        </div>
                        <Controller
                          render={({ field }) => (
                            <div className="flex flex-col">
                              <label
                                className="text-left text-sm font-medium leading-6 text-neutral-900"
                                htmlFor={field.name}
                              >
                                Description
                              </label>
                              <input
                                {...field}
                                id={field.name}
                                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                              />
                            </div>
                          )}
                          name="description"
                          control={control}
                        />
                        <Controller
                          render={({ field }) => (
                            <div className="flex flex-col">
                              <label
                                className="text-left text-sm font-medium leading-6 text-neutral-900"
                                htmlFor={field.name}
                              >
                                Text
                              </label>
                              <textarea
                                {...field}
                                id={field.name}
                                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                              />
                            </div>
                          )}
                          name="text"
                          control={control}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 px-2 sm:mt-6">
                      <button
                        type="button"
                        className="focusable flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800/20 px-4 py-2 text-lg font-semibold text-amber-700 hover:bg-amber-800/30"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="focusable flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800/20 px-4 py-2 text-lg font-semibold text-emerald-700 hover:bg-emerald-800/30"
                      >
                        <CheckIcon className="h-6 w-6" />
                        Done
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

function AddNotesPrompt({
  update,
  index,
  item,
}: {
  update: UseFieldArrayUpdate<CreatePieceData>;
  index: number;
  item: FieldArrayWithId<CreatePieceData, "spots">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm<CreateNotesPrompt>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(createNotesPrompt),
    defaultValues: {
      notes: item.notesPrompt?.notes ?? "",
      description: item.notesPrompt?.description ?? "",
    },
  });

  function onSubmit(data: CreateNotesPrompt) {
    update(index, {
      ...item,
      notesPrompt: data,
    });
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "focusable flex items-center justify-center gap-1 rounded-xl bg-sky-700/10 py-2 font-semibold text-sky-800  transition duration-200 hover:bg-sky-700/20",
          {
            "bg-sky-700/10": !item.notesPrompt,
            "bg-sky-500/50": item.notesPrompt,
          },
        )}
      >
        {item.notesPrompt ? (
          <>
            <span className="sr-only">Checked</span>
            <CheckIcon className="h-4 w-4" />
          </>
        ) : (
          <MusicalNoteIcon className="h-4 w-4" />
        )}
        Notes
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="back fixed inset-0 bg-neutral-800/30 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ${workSans.className}`}
                >
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-neutral-900"
                        >
                          Add Text Prompt
                        </Dialog.Title>
                        <div className="prose prose-sm prose-neutral mt-2 text-center">
                          Enter some text to remind yourself about this spot.
                        </div>
                        <Controller
                          render={({ field }) => (
                            <div className="flex flex-col">
                              <label
                                className="text-left text-sm font-medium leading-6 text-neutral-900"
                                htmlFor={field.name}
                              >
                                Description
                              </label>
                              <input
                                {...field}
                                id={field.name}
                                className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                              />
                            </div>
                          )}
                          name="description"
                          control={control}
                        />
                        <Controller
                          render={({ field }) => (
                            <>
                              <div className="flex flex-col">
                                <label
                                  className="text-left text-sm font-medium leading-6 text-neutral-900"
                                  htmlFor={field.name}
                                >
                                  ABC Notes
                                </label>
                                <textarea
                                  {...field}
                                  id={field.name}
                                  className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                                  placeholder="Enter Notes using ABC notation"
                                />
                              </div>
                              {/* TODO: add link to abcjs */}
                              <div className="h-[100px]">
                                <NotesDisplay
                                  notes={field.value}
                                  baseId={field.name}
                                />
                              </div>
                            </>
                          )}
                          name="notes"
                          control={control}
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 px-2 sm:mt-6">
                      <button
                        type="button"
                        className="focusable flex w-full items-center justify-center gap-1 rounded-xl bg-amber-800/20 px-4 py-2 text-lg font-semibold text-amber-700 hover:bg-amber-800/30"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6" />
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="focusable flex w-full items-center justify-center gap-1 rounded-xl bg-emerald-800/20 px-4 py-2 text-lg font-semibold text-emerald-700 hover:bg-emerald-800/30"
                      >
                        <CheckIcon className="h-6 w-6" />
                        Done
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
