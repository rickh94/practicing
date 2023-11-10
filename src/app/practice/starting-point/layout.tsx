import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Starting Point | Practicing",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
