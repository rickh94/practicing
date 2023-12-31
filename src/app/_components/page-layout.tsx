import { Work_Sans } from "next/font/google";

export const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

// TODO: add skip to content button to layouts
export function PageHeroLayout({
  children,
  leftButton = null,
  rightButton = null,
}: {
  children: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}) {
  function justifyClass() {
    if (leftButton && rightButton) {
      return "justify-between";
    }
    if (leftButton) {
      return "justify-start";
    }
    if (rightButton) {
      return "justify-end";
    }
    return "justify-center";
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ffefce] to-white ${workSans.className}`}
    >
      <div className="absolute left-0 top-0 w-full p-4">
        <div className={`mx-auto flex sm:container ${justifyClass()}`}>
          {leftButton}
          {rightButton}
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {(!!rightButton || !!leftButton) && <div className="h-4 lg:hidden" />}
        {children}
      </div>
    </main>
  );
}

export function PageColumnLayout({
  children,
  leftButton = null,
  rightButton = null,
}: {
  children: React.ReactNode;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}) {
  function justifyClass() {
    if (leftButton && rightButton) {
      return "justify-between";
    }
    if (leftButton) {
      return "justify-start";
    }
    if (rightButton) {
      return "justify-end";
    }
    return "justify-center";
  }
  return (
    <main
      className={`relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#ffefce] to-[#ffffff] ${workSans.className}`}
    >
      <div className="absolute left-0 top-0 w-full p-4">
        <div className={`mx-auto flex sm:container ${justifyClass()}`}>
          {leftButton}
          {rightButton}
        </div>
      </div>
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-8">
        {(!!rightButton || !!leftButton) && <div className="h-4 md:hidden" />}
        {children}
      </div>
    </main>
  );
}
