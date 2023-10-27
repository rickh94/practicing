import { UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BackToDashboard } from "~/app/_components/links";
import { PageColumnLayout } from "~/app/_components/page-layout";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Loader from "../_components/loader";
import PasskeyManagement from "./passkeys";
import UserInfo from "./userInfo";
import UserInfoDisplay from "./userInfoDisplay";

export default async function Dashboard() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }
  const userInfo = await api.user.getUserInfo.query();

  return (
    <>
      <PageColumnLayout
        leftButton={<BackToDashboard />}
        rightButton={
          <Link
            href="/api/auth/signout"
            className="focusable flex items-center gap-1 rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
          >
            <UserIcon className="inline h-6 w-6" />
            <span>Logout</span>
          </Link>
        }
      >
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-800 sm:text-[3rem]">
            Account
          </h1>
        </div>
        <div className="relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-5xl md:grid-cols-2">
          <UserInfo
            display={
              <Suspense fallback={<Loader />}>
                <UserInfoDisplay />
              </Suspense>
            }
            initialUserInfo={userInfo}
          />
          <PasskeyManagement />
        </div>
      </PageColumnLayout>
    </>
  );
}
