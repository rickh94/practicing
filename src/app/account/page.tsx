import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getServerAuthSession } from "~/server/auth";
import PasskeyManagement from "./passkeys";
import UserInfo from "./userInfo";
import UserInfoDisplay from "./userInfoDisplay";
import { PasskeySkeleton } from "../_components/skeletons";

// TODO: make skeletons, maybe move userInfo query down.

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Your Account
        </h1>
      </div>
      <div className="relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-5xl md:grid-cols-2">
        <UserInfo display={<UserInfoDisplay />} />
        <Suspense fallback={<PasskeySkeleton />}>
          <PasskeyManagement />
        </Suspense>
      </div>
    </>
  );
}
