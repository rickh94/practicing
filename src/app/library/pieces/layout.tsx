import { PageColumnLayout } from "~/app/_components/page-layout";
import { AccountLink, LibraryLink } from "@ui/links";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  return (
    <PageColumnLayout
      leftButton={<LibraryLink />}
      rightButton={<AccountLink />}
    >
      {children}
    </PageColumnLayout>
  );
}
