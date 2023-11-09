import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";
import { extractRouterConfig } from "uploadthing/server";
import { workSans } from "~/app/_components/page-layout";
import { pFileRouter } from "~/app/api/uploadthing/core";
import { TRPCReactProvider } from "~/trpc/react";

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
        <Toaster position="top-center" />
        <NextSSRPlugin routerConfig={extractRouterConfig(pFileRouter)} />
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
