import { PageColumnLayout } from "~/app/_components/page-layout";
import { AccountLink, BackToHome } from "@ui/links";

// TODO: replace with navigation
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageColumnLayout leftButton={<BackToHome />} rightButton={<AccountLink />}>
      {children}
    </PageColumnLayout>
  );
}
