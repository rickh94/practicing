"use client";
import { Suspense, useState } from "react";
import UserInfoForm from "./userInfoForm";
import { UserInfoSkeleton } from "../_components/skeletons";
import { signOut } from "next-auth/react";
import { CrossFadeContent } from "@ui/transitions";
import { PencilIcon } from "@heroicons/react/20/solid";
import { GiantWarningButton, WarningButton } from "@ui/buttons";

export default function UserInfo({ display }: { display: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [needsReverify, setNeedsReverify] = useState(false);
  return (
    <div className="flex flex-col rounded-xl bg-neutral-700/5 p-4">
      <div className="px-4 pb-1 sm:px-0">
        <h3 className="text-xl font-semibold leading-7 text-neutral-900">
          {isEditing ? "Edit" : "Account"} Information
        </h3>
        <p className="max-w-2xl text-sm leading-6 text-neutral-500">
          {isEditing ? "Edit" : "View"} your account information
        </p>
      </div>
      <CrossFadeContent
        className="flex flex-grow flex-col justify-between"
        id={isEditing ? "edit" : "view"}
        component={
          isEditing ? (
            <UserInfoForm
              stopEditing={() => setIsEditing(false)}
              setNeedsReverify={setNeedsReverify}
            />
          ) : (
            <>
              <Suspense fallback={<UserInfoSkeleton />}>{display}</Suspense>
              <WarningButton
                onClick={() => setIsEditing(true)}
                className="mb-2 mt-4"
              >
                <PencilIcon className="-ml-1 h-4 w-4" />
                Edit
              </WarningButton>
            </>
          )
        }
      />
      {needsReverify && (
        <div className="col-span-full mt-16 flex w-full items-center justify-center px-4 py-8">
          <GiantWarningButton onClick={() => signOut()}>
            Sign out to verify your email
          </GiantWarningButton>
        </div>
      )}
    </div>
  );
}
