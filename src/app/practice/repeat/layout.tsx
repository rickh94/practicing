import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Repeat | Practicing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
