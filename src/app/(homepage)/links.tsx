import { getServerAuthSession } from "~/server/auth";
import { LibraryLink, LoginLink, LogoutLink } from "~/app/_components/links";

export async function RightLink() {
  const session = await getServerAuthSession();
  return session?.user ? <LibraryLink /> : <LoginLink />;
}

export async function LeftLink() {
  const session = await getServerAuthSession();
  return session?.user ? <LogoutLink /> : null;
}
