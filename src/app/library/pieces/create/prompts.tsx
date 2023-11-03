import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  type UseFieldArrayUpdate,
  type FieldArrayWithId,
} from "react-hook-form";
import {
  type CreateNotesPrompt,
  type CreateTextPrompt,
  type CreatePieceData,
  type CreateAudioPrompt,
  createAudioPrompt,
  createNotesPrompt,
  createTextPrompt,
} from "~/lib/validators/library";
import {
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

import { UploadButton } from "~/app/_components/uploadthing";
import toast from "react-hot-toast";

export function AudioUploader({ setUrl }: { setUrl: (url: string) => void }) {
  return (
    <UploadButton
      appearance={{
        allowedContent: "hidden",
        button:
          "rounded-r-xl rounded-r-xl rounded-l-none bg-neutral-800/20 text-neutral-800 font-medium hover:bg-neutral-800/30 focusable focus-within:ring-neutral-800/80",
        container: "focusable focus-within:ring-neutral-800/80",
        clearBtn:
          "rounded-r-xl rounded-r-xl rounded-l-none bg-neutral-800/20 text-neutral-800 font-medium hover:bg-neutral-800/30 focus-within:ring-neutral-800/80",
      }}
      content={{
        button: "Upload Audio",
      }}
      endpoint="audioUploader"
      onClientUploadComplete={(res) => {
        if (!res?.[0]) {
          toast.error("Error uploading audio");
          return;
        }
        toast.success("Audio uploaded!");
        setUrl(res[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`Error uploading audio: ${error.message}`);
      }}
    />
  );
}

export function AddAudioPrompt({
  update,
  index,
  item,
}: {
  update: UseFieldArrayUpdate<CreatePieceData>;
  index: number;
  item: FieldArrayWithId<CreatePieceData, "spots">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, setValue } = useForm<CreateAudioPrompt>({
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

  function setUrl(url: string) {
    setValue("url", url);
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
                              <div className="flex items-center gap-0">
                                <input
                                  {...field}
                                  id={field.name}
                                  className="focusable rounded-r-0 w-full rounded-l-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                                />
                                <AudioUploader setUrl={setUrl} />
                              </div>
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

export function AddTextPrompt({
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

export function AddNotesPrompt({
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
                                <NotesDisplay notes={field.value} />
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
