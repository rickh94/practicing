"use client";
import { Dialog, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useState, useCallback, Fragment } from "react";
import { getStageDisplayName } from "~/lib/util";
import { type SpotStage } from "~/lib/validators/library";
import { workSans } from "../page-layout";
import { BasicButton } from "@ui/buttons";

export function Stage({
  stageName,
  readMore,
}: {
  stageName: SpotStage;
  readMore?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-medium">{getStageDisplayName(stageName)}</span>
      {readMore && <SpotReadMore />}
    </div>
  );
}

export function SpotReadMore() {
  const [isOpen, setIsOpen] = useState(false);

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
      <button
        className="text-neutral-400 hover:text-neutral-500"
        onClick={open}
      >
        <InformationCircleIcon className="h-4 w-4" />
        <div className="sr-only">Read More</div>
      </button>
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
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-neutral-900"
                      >
                        About Practice Stages
                      </Dialog.Title>
                      <div className="prose prose-sm prose-neutral mt-4 text-left">
                        <p className="text-base">
                          There are five practice stages that I’ve accounted for
                        </p>
                        <ul className="text-base">
                          <li>
                            <strong className="font-semibold">
                              Repeat Practice
                            </strong>{" "}
                            is the default for all new spots. Once you complete
                            repeat practicing, the spot will be advanced to
                          </li>
                          <li>
                            <strong className="font-semibold">
                              Random Practice
                            </strong>{" "}
                            is for solidifying a spot that you have corretly.
                            This can be practiced randomly with other spots from
                            the piece or even other pieces for much better
                            retention than massed practicing.
                          </li>
                          <li>
                            For{" "}
                            <strong className="font-semibold">
                              Interleaved Practice
                            </strong>{" "}
                            you should spread your repetitions out even more, 5+
                            minutes between repetitions. This challenges your
                            spots even more. Try to play them correctly the
                            first time and only once.
                          </li>
                          <li>
                            Once your spots are in excellent shape on their own,
                            you can start{" "}
                            <strong className="font-semibold">
                              Interleaved Days Practicing
                            </strong>{" "}
                            which is the same principle, but you don’t play the
                            spots every day.
                          </li>
                          <li>
                            Mark a spot as{" "}
                            <strong className="font-semibold">
                              {" "}
                              Completed
                            </strong>{" "}
                            once it is in execellent shape and you basically
                            never play it wrong. At this point, you should start
                            combining it with the spots around it, either by
                            simply playing a few spots in order, or create some
                            new overlapping spots for better continuity.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-4 sm:mt-6">
                    <BasicButton grow className="w-full" onClick={close}>
                      Done Reading
                    </BasicButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
