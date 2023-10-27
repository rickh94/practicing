import "~/styles/globals.css";

import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "~/trpc/react";
import { workSans } from "./_components/page-layout";

export const metadata = {
  title: "Music Practicing",
  description:
    "Organize your music practicing to be more effective and prevent bad habits.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${workSans.variable}`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
