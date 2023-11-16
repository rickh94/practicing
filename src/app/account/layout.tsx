import { PageColumnLayout } from "~/app/_components/page-layout";
import { LibraryLink, LogoutLink } from "@ui/links";

// TODO: replace with navigation
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageColumnLayout leftButton={<LibraryLink />} rightButton={<LogoutLink />}>
      {children}
    </PageColumnLayout>
  );
}
