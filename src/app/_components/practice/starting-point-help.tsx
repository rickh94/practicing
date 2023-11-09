import { Fragment } from "react";
import { workSans } from "~/app/_components/page-layout";
import { Dialog, Transition } from "@headlessui/react";

export default function Help({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                className={`relative transform overflow-hidden rounded-xl bg-gradient-to-t from-neutral-50 to-[#fff9ee] px-4 pb-4 pt-5 text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 ${workSans.className}`}
              >
                <div>
                  <div className="text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-neutral-900"
                    >
                      Random Sections
                    </Dialog.Title>
                    <div className="prose prose-sm prose-neutral mt-2 text-left">
                      <p>
                        Playing small random sections of your piece helps you:
                      </p>
                      <ul>
                        <li>
                          Understand the piece more deeply by getting a
                          different perspective compared to your usual spots
                        </li>
                        <li>
                          Quickly transition to different parts of the piece
                        </li>
                        <li>Reinforce your memory of different spots</li>
                        <li>
                          Recover from mistakes by being able to start from
                          anywhere
                        </li>
                      </ul>
                      <p>
                        It is essential that you start and stop exactly where it
                        says. The point is to challenge yourself to do something
                        much more difficult than starting from the beginning and
                        get to know your piece extremely well.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 px-2 sm:mt-6">
                  <button
                    type="button"
                    className="focusable block w-full rounded-xl bg-neutral-800/20 px-6 py-2 text-xl font-semibold text-neutral-700 hover:bg-neutral-800/30"
                    onClick={() => setOpen(false)}
                  >
                    Done Reading
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
