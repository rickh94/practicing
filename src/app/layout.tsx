import "~/styles/globals.css";

import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "~/trpc/react";
import { workSans } from "./_components/page-layout";

export const metadata = {
  title: "Music Practicing",
  description:
    "Organize your music practicing to be more effective and prevent bad habits.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "manifest",
      url: "/site.webmanifest",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${workSans.variable} antialiased`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
