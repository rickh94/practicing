import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Fragment, Suspense, lazy, useCallback, useState } from "react";
import { workSans } from "~/app/_components/page-layout";
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
import { ColorlessButton, HappyButton, WarningButton } from "@ui/buttons";

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
  const { register, handleSubmit, setValue, formState } =
    useForm<UrlOrEmptyForm>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(urlOrEmptyForm),
      defaultValues: {
        url: audioPromptUrl ?? "",
      },
    });

  const open = useCallback(
    function () {
      setIsOpen(true);
    },
    [setIsOpen],
  );

  const close = useCallback(
    function () {
      setIsOpen(false);
    },
    [setIsOpen],
  );

  const onSubmit = useCallback(
    function (data: UrlOrEmptyForm) {
      save(data.url);
      setIsOpen(false);
    },
    [save, setIsOpen],
  );

  const setUrl = useCallback(
    function (url: string) {
      setValue("url", url);
    },
    [setValue],
  );

  return (
    <>
      <ColorlessButton
        onClick={open}
        className={cn(
          audioPromptUrl ? "bg-yellow-500/50" : "bg-yellow-700/10",
          "text-yellow-800",
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
      </ColorlessButton>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
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
                        <div className="flex flex-col">
                          <label
                            className="text-left text-sm font-medium leading-6 text-neutral-900"
                            htmlFor="url"
                          >
                            Url
                          </label>
                          <div className="flex items-center gap-0">
                            <input
                              id="url"
                              {...register("url", { required: true })}
                              className="focusable rounded-r-0 w-full rounded-l-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                            />
                            <AudioUploader
                              setUrl={setUrl}
                              setIsUploading={setIsUploading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 sm:mt-6">
                      <WarningButton onClick={close} grow>
                        <XMarkIcon className="h-6 w-6" />
                        Cancel
                      </WarningButton>
                      <HappyButton
                        grow
                        disabled={isUploading || !formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                      >
                        {isUploading ? (
                          <ArrowPathIcon className="h-6 w-6" />
                        ) : (
                          <CheckIcon className="h-6 w-6" />
                        )}
                        {isUploading ? "Please Wait..." : "Done"}
                      </HappyButton>
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

export function AddImagePrompt({
  save,
  imagePromptUrl,
}: {
  save: (url: string) => void;
  imagePromptUrl?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, setValue, formState } =
    useForm<UrlOrEmptyForm>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(urlOrEmptyForm),
      defaultValues: {
        url: imagePromptUrl ?? "",
      },
    });

  const onSubmit = useCallback(
    function (data: UrlOrEmptyForm) {
      save(data.url);
      setIsOpen(false);
    },
    [save, setIsOpen],
  );

  const setUrl = useCallback(
    function (url: string) {
      setValue("url", url);
    },
    [setValue],
  );

  const open = useCallback(
    function () {
      setIsOpen(true);
    },
    [setIsOpen],
  );

  const close = useCallback(
    function () {
      setIsOpen(false);
    },
    [setIsOpen],
  );

  return (
    <>
      <ColorlessButton
        onClick={open}
        className={cn(
          imagePromptUrl ? "bg-indigo-500/50" : "bg-indigo-700/10",
          "text-indigo-800",
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
      </ColorlessButton>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
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
                        <div className="flex flex-col">
                          <label
                            className="text-left text-sm font-medium leading-6 text-neutral-900"
                            htmlFor="url"
                          >
                            Url
                          </label>
                          <div className="flex items-center gap-0">
                            <input
                              {...register("url", { required: true })}
                              id="url"
                              className="focusable rounded-r-0 w-full rounded-l-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                            />
                            <ImageUploader
                              setUrl={setUrl}
                              setIsUploading={setIsUploading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 sm:mt-6">
                      <WarningButton onClick={close} grow>
                        <XMarkIcon className="-ml-1 h-6 w-6" />
                        Cancel
                      </WarningButton>
                      <HappyButton
                        grow
                        disabled={isUploading || !formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                      >
                        {isUploading ? (
                          <ArrowPathIcon className="h-6 w-6" />
                        ) : (
                          <CheckIcon className="h-6 w-6" />
                        )}
                        {isUploading ? "Please Wait..." : "Done"}
                      </HappyButton>
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
  const { register, handleSubmit, formState } = useForm<TextForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(textForm),
    defaultValues: {
      text: textPrompt ?? "",
    },
  });

  const onSubmit = useCallback(
    function (data: TextForm) {
      save(data.text);
      setIsOpen(false);
    },
    [save, setIsOpen],
  );

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <>
      <ColorlessButton
        onClick={open}
        className={cn(
          textPrompt ? "bg-lime-500/50" : "bg-lime-700/10",
          "text-lime-800",
        )}
      >
        {!!textPrompt ? (
          <>
            <span className="sr-only">Checked</span>
            <CheckIcon className="h-4 w-4" />
          </>
        ) : (
          <DocumentTextIcon className="h-4 w-4" />
        )}
        Text
      </ColorlessButton>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
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
                        <div className="flex flex-col">
                          <label
                            className="text-left text-sm font-medium leading-6 text-neutral-900"
                            htmlFor="text"
                          >
                            Text
                          </label>
                          <textarea
                            {...register("text", { required: true })}
                            id="text"
                            className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 sm:mt-6">
                      <WarningButton grow onClick={close}>
                        <XMarkIcon className="h-6 w-6" />
                        Cancel
                      </WarningButton>
                      <HappyButton
                        disabled={!formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                        grow
                      >
                        <CheckIcon className="h-6 w-6" />
                        Done
                      </HappyButton>
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
  const { register, handleSubmit, formState, watch } = useForm<NotesForm>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(notesForm),
    defaultValues: {
      notes: notesPrompt ?? "",
    },
  });

  const onSubmit = useCallback(
    function (data: NotesForm) {
      save(data.notes);
      setIsOpen(false);
    },
    [save, setIsOpen],
  );

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <>
      <ColorlessButton
        type="button"
        onClick={open}
        className={cn(
          notesPrompt ? "bg-sky-500/50" : "bg-sky-700/10",
          "text-sky-500",
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
      </ColorlessButton>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
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
                        <div className="flex flex-col">
                          <label
                            className="text-left text-sm font-medium leading-6 text-neutral-900"
                            htmlFor="notes"
                          >
                            ABC Notes
                          </label>
                          <textarea
                            {...register("notes")}
                            id="notes"
                            className="focusable w-full rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 placeholder-neutral-700 transition duration-200 focus:bg-neutral-700/20"
                            placeholder="Enter Notes using ABC notation"
                          />
                        </div>
                        <div className="h-[100px]">
                          <Suspense fallback={<div>Loading notes...</div>}>
                            <NotesDisplay
                              notes={watch("notes")}
                              responsive="resize"
                            />
                          </Suspense>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex gap-4 sm:mt-6">
                      <WarningButton grow onClick={close}>
                        <XMarkIcon className="h-6 w-6" />
                        Cancel
                      </WarningButton>
                      <HappyButton
                        grow
                        disabled={!formState.isValid}
                        onClick={handleSubmit(onSubmit)}
                      >
                        <CheckIcon className="h-6 w-6" />
                        Done
                      </HappyButton>
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
