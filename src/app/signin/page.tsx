import { getServerAuthSession } from "~/server/auth";
import { PageHeroLayout } from "~/app/_components/page-layout";
import SignInComponent from "~/app/_components/signin";
import { redirect } from "next/navigation";
import { BackToHome } from "@ui/links";

import { type Metadata } from "next";
import { siteTitle } from "~/lib/util";

export const metadata: Metadata = {
  title: `Sign In | ${siteTitle}`,
};

export default async function SignInPage() {
  const session = await getServerAuthSession();
  if (session?.user?.id) {
    return redirect("/");
  }

  return (
    <PageHeroLayout leftButton={<BackToHome />}>
      <SignInComponent />
    </PageHeroLayout>
  );
}
