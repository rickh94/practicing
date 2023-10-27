"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { api } from "~/trpc/react";
import { workSans } from "../_components/page-layout";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeletePasskeys() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();
  const { mutate } = api.user.deletePasskeys.useMutation({
    onSuccess: () => {
      setConfirmOpen(false);
      router.refresh();
      toast.success("Passkeys deleted!");
    },
    onError: () => {
      toast.error("Could not delete passkeys");
    },
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="focusable rounded-xl bg-rose-700/10 px-4 py-2 font-semibold text-rose-800 transition duration-200 hover:bg-rose-700/20"
      >
        Delete Passkeys
      </button>
      <Transition.Root show={confirmOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setConfirmOpen}>
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
                        Delete Passkeys
                      </Dialog.Title>
                      <div className="prose prose-sm prose-neutral mt-2 text-center">
                        This will delete all registered passkeys from all
                        devices. This action cannot be undone. You will still be
                        able to log in using your email address.
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-4 px-2 sm:mt-6">
                    <button
                      type="button"
                      className="focusable block w-full rounded-xl bg-amber-800/20 px-4 py-2 text-lg font-semibold text-amber-700 hover:bg-amber-800/30"
                      onClick={() => setConfirmOpen(false)}
                    >
                      No, Cancel
                    </button>
                    <button
                      type="button"
                      className="focusable block w-full rounded-xl bg-rose-800/20 px-4 py-2 text-lg font-semibold text-rose-700 hover:bg-rose-800/30"
                      onClick={() => mutate()}
                    >
                      Yes, Delete
                    </button>
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
