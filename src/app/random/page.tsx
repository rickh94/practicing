"use client";

import { useState } from "react";
import { PageColumnLayout } from "~/app/_components/page-layout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { BackToHome } from "~/app/_components/links";
import Help from "~/app/_components/random/help";
import TabChooser from "~/app/_components/random/tabchooser";

export default function Random() {
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
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-800">
            Practice Randomizer
          </h1>
        </div>
        <TabChooser />
      </PageColumnLayout>
    </>
  );
}
