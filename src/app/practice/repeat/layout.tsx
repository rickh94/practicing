import { type Metadata } from "next";
import { siteTitle } from "~/lib/util";

export const metadata: Metadata = {
  title: `Repeat | ${siteTitle}`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
