import { getServerAuthSession } from "~/server/auth";
import { AccountLink, LibraryLink, LoginLink } from "~/app/_components/links";
import { TitleLinkMenu } from "../_components/practicing/title-link-menu";

export async function RightLink() {
  const session = await getServerAuthSession();
  return session?.user ? <LibraryLink /> : <LoginLink />;
}

export async function LeftLink() {
  const session = await getServerAuthSession();
  return session?.user ? (
    <AccountLink />
  ) : (
    <div className="mt-4">
      <TitleLinkMenu />
    </div>
  );
}
