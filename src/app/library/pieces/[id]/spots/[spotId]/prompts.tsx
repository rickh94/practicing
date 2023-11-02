"use client";

import { Disclosure, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/20/solid";
import {
  type TextPrompt,
  type AudioPrompt,
  NotesPrompt,
} from "~/lib/validators/library";
import { cn } from "~/app/lib/utils";
import NotesDisplay from "~/app/_components/AbcNotesDisplay";

export function AudioPromptReveal({
  audioPrompt,
}: {
  audioPrompt?: AudioPrompt | null;
}) {
  if (!audioPrompt) {
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
              <p>
                <span className="font-medium">Description:</span>{" "}
                {audioPrompt.description}
              </p>
              <audio controls className="w-full py-2">
                <source src={audioPrompt.url} type="audio/mpeg" />
              </audio>
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
  textPrompt?: TextPrompt | null;
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
              <p>
                <span className="font-medium">Description:</span>{" "}
                {textPrompt.description}
              </p>
              <p>{textPrompt.text}</p>
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
  notesPrompt?: NotesPrompt | null;
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
              <p>
                <span className="font-medium">Description:</span>{" "}
                {notesPrompt.description}
              </p>
              <NotesDisplay
                notes={notesPrompt.notes}
                baseId={`${notesPrompt.id}-notes`}
              />
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
