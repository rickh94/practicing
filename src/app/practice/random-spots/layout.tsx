import { type Metadata } from "next";
import { siteTitle } from "~/lib/util";

export const metadata: Metadata = {
  title: `Random Spots | ${siteTitle}`,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
