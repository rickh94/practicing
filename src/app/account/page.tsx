import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getServerAuthSession } from "~/server/auth";
import PasskeyManagement from "./passkeys";
import UserInfo from "./userInfo";
import UserInfoDisplay from "./userInfoDisplay";
import { PasskeySkeleton } from "../_components/skeletons";
import { TwoColumnPageContainer } from "../_components/containers";

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
          Your Account
        </h1>
      </div>
      <TwoColumnPageContainer>
        <UserInfo display={<UserInfoDisplay />} />
        <Suspense fallback={<PasskeySkeleton />}>
          <PasskeyManagement />
        </Suspense>
      </TwoColumnPageContainer>
    </>
  );
}
