"use client";

import { useState } from "react";
import { PageColumnLayout } from "~/app/_components/page-layout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { BackToHome } from "~/app/_components/links";
import Help from "~/app/_components/practicing/starting-point-help";
import { TitleLinkMenu } from "~/app/_components/practicing/title-link-menu";
import StartingPoint from "~/app/_components/practicing/starting-point";

// TODO: change help

export default function Page() {
  // TODO: fix back button so it scrolls off
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <>
      <PageColumnLayout
        leftButton={<BackToHome />}
        rightButton={
          <button
            type="button"
            className="focusable block self-end rounded-xl bg-neutral-700/10 px-6 py-4 font-semibold text-neutral-700 hover:bg-neutral-700/20"
            onClick={() => {
              setHelpOpen(true);
            }}
          >
            <span className="flex items-center gap-1">
              <span>Read More</span>
              <InformationCircleIcon className="inline h-6 w-6" />
            </span>
          </button>
        }
      >
        <Help open={helpOpen} setOpen={setHelpOpen} />
        <div className="flex items-center justify-center">
          <TitleLinkMenu />
        </div>
        <StartingPoint />
      </PageColumnLayout>
    </>
  );
}
