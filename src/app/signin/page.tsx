import { getServerAuthSession } from "~/server/auth";
import { PageHeroLayout } from "../_components/page-layout";
import SignInComponent from "../_components/signin";
import { redirect } from "next/navigation";
import { BackToHome } from "../_components/links";

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
