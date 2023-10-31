"use client";
import { Suspense, useState } from "react";
import UserInfoForm from "./userInfoForm";
import { Transition } from "@headlessui/react";
import Loader from "~/app/_components/loader";
import { UserInfoSkeleton } from "../_components/skeletons";

export default function UserInfo({ display }: { display: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="h-72 rounded-xl bg-neutral-700/5 p-4 sm:h-64">
      <div className="px-4 pb-1 sm:px-0">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          {isEditing ? "Edit" : "Account"} Information
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500">
          {isEditing ? "Edit" : "View"} your account information
        </p>
      </div>
      <div className="relative">
        <Transition
          className="absolute left-0 top-0 w-full"
          show={isEditing}
          enter="transition ease-out transform duration-200 delay-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in transform duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <UserInfoForm stopEditing={() => setIsEditing(false)} />
        </Transition>
        <Transition
          className="absolute left-0 top-0 w-full"
          show={!isEditing}
          enter="transition ease-out duration-200 delay-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Suspense fallback={<UserInfoSkeleton />}>{display}</Suspense>
          <button
            onClick={() => setIsEditing(true)}
            type="button"
            className="focusable mt-4 block rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-700 hover:bg-amber-700/20"
          >
            Edit
          </button>
        </Transition>
      </div>
    </div>
  );
}
