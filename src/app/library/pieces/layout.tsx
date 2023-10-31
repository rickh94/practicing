import { PageColumnLayout } from "~/app/_components/page-layout";
import { AccountLink, LibraryLink } from "~/app/_components/links";

// TODO: replace with navigation
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageColumnLayout
      leftButton={<LibraryLink />}
      rightButton={<AccountLink />}
    >
      {children}
    </PageColumnLayout>
  );
}
