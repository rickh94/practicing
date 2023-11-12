import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  SpeakerWaveIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Suspense, lazy, useState } from "react";
import { workSans } from "~/app/_components/page-layout";
// import NotesDisplay from "~/app/_components/AbcNotesDisplay";
import { cn } from "~/lib/util";

import { UploadButton } from "~/app/_components/uploadthing";
import toast from "react-hot-toast";
import {
  type UrlOrEmptyForm,
  urlOrEmptyForm,
  textForm,
  type TextForm,
  type NotesForm,
  notesForm,
} from "~/lib/validators/library";

const NotesDisplay = lazy(() => import("../AbcNotesDisplay"));

// TODO: way to delete prompts

export function AudioUploader({
  setUrl,
  setIsUploading,
}: {
  setUrl: (url: string) => void;
  setIsUploading: (isUploading: boolean) => void;
}) {
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
      onUploadBegin={() => {
        setIsUploading(true);
        toast.loading("Uploading audio...");
      }}
      onClientUploadComplete={(res) => {
        toast.dismiss();
        if (!res?.[0]) {
          toast.error("Error uploading audio");
          return;
        }
        toast.success("Audio uploaded!");
        setUrl(res[0].url);
        setIsUploading(false);
      }}
      onUploadError={(error: Error) => {
        toast.error(`Error uploading audio: ${error.message}`);
        setIsUploading(false);
      }}
    />
  );
}

export function AddAudioPrompt({
  save,
  audioPromptUrl,
}: {
  save: (url: string) => void;
  audioPromptUrl?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { control, handleSubmit, setValue, formState } =
    useForm<UrlOrEmptyForm>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(urlOrEmptyForm),
      defaultValues: {
        url: audioPromptUrl ?? "",
      },
    });

  function onSubmit(data: UrlOrEmptyForm) {
    save(data.url);
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
            "bg-yellow-700/10": !audioPromptUrl,
            "bg-yellow-500/50": audioPromptUrl,
          },
        )}
      >
        {audioPromptUrl ? (
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
                        <div className="prose prose-sm prose-neutral mt-2 text-left">
                          Upload an audio file (max 512KB) or paste in a public
                          URL to audio that will prompt you for this spot.
                        </div>
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
                                <AudioUploader
                                  setUrl={setUrl}
                                  setIsUploading={setIsUploading}
                                />
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
                        disabled={isUploading || !formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                        className={cn(
                          "focusable flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-lg font-semibold",
                          {
                            "pointer-events-none bg-neutral-700/50 text-neutral-900":
                              isUploading || !formState.isValid,
                            "bg-green-800/20 text-green-700  hover:bg-green-800/30":
                              !isUploading && formState.isValid,
                          },
                        )}
                      >
                        {isUploading ? (
                          <ArrowPathIcon className="h-6 w-6" />
                        ) : (
                          <CheckIcon className="h-6 w-6" />
                        )}

                        {isUploading ? "Please Wait..." : "Done"}
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

// TODO: update audio uploader to match
export function ImageUploader({
  setUrl,
  setIsUploading,
}: {
  setUrl: (url: string) => void;
  setIsUploading: (isUploading: boolean) => void;
}) {
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
        button: "Upload Image",
      }}
      endpoint="imageUploader"
      onUploadBegin={() => {
        toast.loading("Uploading image...");
        setIsUploading(true);
      }}
      onClientUploadComplete={(res) => {
        toast.dismiss();
        if (!res?.[0]) {
          toast.error("Error uploading image");
          return;
        }
        toast.success("Image uploaded!");
        setUrl(res[0].url);
        setIsUploading(false);
      }}
      onUploadError={(error: Error) => {
        setIsUploading(false);
        toast.error(`Error uploading image: ${error.message}`);
      }}
    />
  );
}

// TODO: update prompts to match and preserve id
export function AddImagePrompt({
  save,
  imagePromptUrl,
}: {
  save: (url: string) => void;
  imagePromptUrl?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { control, handleSubmit, setValue, formState } =
    useForm<UrlOrEmptyForm>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(urlOrEmptyForm),
      defaultValues: {
        url: imagePromptUrl ?? "",
      },
    });

  function onSubmit(data: UrlOrEmptyForm) {
    save(data.url);
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
          "focusable flex items-center justify-center gap-1 rounded-xl py-2 font-semibold text-indigo-800  transition duration-200 hover:bg-indigo-700/20",
          {
            "bg-indigo-700/10": !imagePromptUrl,
            "bg-indigo-500/50": imagePromptUrl,
          },
        )}
      >
        {imagePromptUrl ? (
          <>
            <span className="sr-only">Checked</span>
            <CheckIcon className="h-4 w-4" />
          </>
        ) : (
          <PhotoIcon className="h-4 w-4" />
        )}
        Image
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
                          Add Image Prompt
                        </Dialog.Title>
                        <div className="prose prose-sm prose-neutral mt-2 text-left">
                          Upload an image or screenshot (max 512KB) or enter a
                          public URL for an image to use as a prompt for this
                          spot.
                        </div>
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
                                <ImageUploader
                                  setUrl={setUrl}
                                  setIsUploading={setIsUploading}
                                />
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
                        disabled={isUploading || !formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                        className={cn(
                          "focusable flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-lg font-semibold",
                          {
                            "pointer-events-none bg-neutral-700/50 text-neutral-900":
                              isUploading,
                            "bg-green-800/20 text-green-700  hover:bg-green-800/30":
                              !isUploading,
                          },
                        )}
                      >
                        {isUploading ? (
                          <ArrowPathIcon className="h-6 w-6" />
                        ) : (
                          <CheckIcon className="h-6 w-6" />
                        )}
                        {isUploading ? "Please Wait..." : "Done"}
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
  save,
  textPrompt,
}: {
  save: (text: string) => void;
  textPrompt?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, formState } = useForm<TextForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(textForm),
    defaultValues: {
      text: textPrompt ?? "",
    },
  });

  function onSubmit(data: TextForm) {
    save(data.text);
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
            "bg-lime-700/10": !textPrompt,
            "bg-lime-500/50": textPrompt,
          },
        )}
      >
        {textPrompt ? (
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
                        <div className="prose prose-sm prose-neutral mt-2 text-left">
                          Enter some text to remind yourself about this spot.
                        </div>
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
                        disabled={!formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                        className={cn(
                          "focusable flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-lg font-semibold",
                          {
                            "pointer-events-none bg-neutral-700/50 text-neutral-900":
                              !formState.isValid,
                            "bg-green-800/20 text-green-700  hover:bg-green-800/30":
                              formState.isValid,
                          },
                        )}
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
  save,
  notesPrompt,
}: {
  save: (notes: string) => void;
  notesPrompt?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, formState } = useForm<NotesForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(notesForm),
    defaultValues: {
      notes: notesPrompt ?? "",
    },
  });

  function onSubmit(data: NotesForm) {
    save(data.notes);
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
            "bg-sky-700/10": !notesPrompt,
            "bg-sky-500/50": notesPrompt,
          },
        )}
      >
        {notesPrompt ? (
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
                          Add Notes Prompt
                        </Dialog.Title>
                        <div className="prose prose-sm prose-neutral mt-2 text-left">
                          The text box below will treated as{" "}
                          <a
                            href="https://abcnotation.com/"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ABC notation
                          </a>{" "}
                          and rendered below.{" "}
                        </div>
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
                                <Suspense
                                  fallback={<div>Loading notes...</div>}
                                >
                                  <NotesDisplay
                                    notes={field.value}
                                    responsive="resize"
                                  />
                                </Suspense>
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
                        disabled={!formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                        className={cn(
                          "focusable flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-lg font-semibold",
                          {
                            "pointer-events-none bg-neutral-700/50 text-neutral-900":
                              !formState.isValid,
                            "bg-green-800/20 text-green-700  hover:bg-green-800/30":
                              formState.isValid,
                          },
                        )}
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
