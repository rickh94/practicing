import { getServerAuthSession } from "~/server/auth";
import { AccountLink, LibraryLink, LoginLink } from "~/app/_components/links";

export async function RightLink() {
  const session = await getServerAuthSession();
  return session?.user ? <LibraryLink /> : <LoginLink />;
}

export async function LeftLink() {
  const session = await getServerAuthSession();
  return session?.user ? <AccountLink /> : null;
}
