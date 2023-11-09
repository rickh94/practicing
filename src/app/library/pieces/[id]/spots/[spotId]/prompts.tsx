"use client";

import { Disclosure, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  PhotoIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/20/solid";
import { cn } from "~/lib/util";
import NotesDisplay from "~/app/_components/AbcNotesDisplay";
import Image from "next/image";

export function AudioPromptReveal({
  audioPromptUrl,
}: {
  audioPromptUrl?: string | null;
}) {
  if (!audioPromptUrl) {
    return <div>No Audio Prompt</div>;
  }
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between gap-1 rounded-xl bg-yellow-500/50 py-2 pl-4 pr-2 font-semibold text-yellow-800  transition duration-200 hover:bg-yellow-300/50">
            <div className="flex items-center gap-2">
              <SpeakerWaveIcon className="h-6 w-6" />
              Audio Prompt
            </div>
            <ChevronRightIcon
              className={cn("h-6 w-6 transition-transform", {
                "rotate-90 transform": open,
              })}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-4 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-4 opacity-0"
          >
            <Disclosure.Panel className="py-1">
              <audio controls className="w-full py-2">
                <source src={audioPromptUrl} type="audio/mpeg" />
              </audio>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

// TODO: add modal to view the image large
export function ImagePromptReveal({
  imagePromptUrl,
}: {
  imagePromptUrl?: string | null;
}) {
  if (!imagePromptUrl) {
    return <div>No Image Prompt</div>;
  }
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center justify-between gap-1 rounded-xl bg-indigo-500/50 py-2 pl-4 pr-2 font-semibold text-indigo-800  transition duration-200 hover:bg-indigo-300/50">
            <div className="flex items-center gap-2">
              <PhotoIcon className="h-6 w-6" />
              Image Prompt
            </div>
            <ChevronRightIcon
              className={cn("h-6 w-6 transition-transform", {
                "rotate-90 transform": open,
              })}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-4 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-4 opacity-0"
          >
            <Disclosure.Panel className="py-1">
              <Image
                src={imagePromptUrl}
                alt="Image Prompt"
                width={480}
                height={120}
                layout="responsive"
              />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export function TextPromptReveal({
  textPrompt,
}: {
  textPrompt?: string | null;
}) {
  if (!textPrompt) {
    return <div>No Text Prompt</div>;
  }
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="z-20 flex items-center justify-between gap-1 rounded-xl bg-lime-500/50 py-2 pl-4 pr-2 font-semibold text-lime-800  transition duration-200 hover:bg-lime-300/50">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="h-6 w-6" />
              Text Prompt
            </div>
            <ChevronRightIcon
              className={cn("h-6 w-6 transition-transform", {
                "rotate-90 transform": open,
              })}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-4 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-4 opacity-0"
          >
            <Disclosure.Panel className="py-1">
              <p>{textPrompt}</p>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export function NotesPromptReveal({
  notesPrompt,
}: {
  notesPrompt?: string | null;
}) {
  if (!notesPrompt) {
    return <div>No Notes Prompt</div>;
  }
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="z-20 flex items-center justify-between gap-1 rounded-xl bg-sky-500/50 py-2 pl-4 pr-2 font-semibold text-sky-800  transition duration-200 hover:bg-sky-300/50">
            <div className="flex items-center gap-2">
              <MusicalNoteIcon className="h-6 w-6" />
              Notes Prompt
            </div>
            <ChevronRightIcon
              className={cn("h-6 w-6  transition-transform", {
                "rotate-90 transform": open,
              })}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-4 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-4 opacity-0"
          >
            <Disclosure.Panel className="py-1">
              <NotesDisplay notes={notesPrompt} />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
