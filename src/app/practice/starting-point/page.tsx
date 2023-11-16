"use client";

import { useState } from "react";
import { PageColumnLayout } from "~/app/_components/page-layout";
import { BackToHome } from "@ui/links";
import Help from "~/app/_components/practice/starting-point-help";
import { TitleLinkMenu } from "~/app/_components/practice/title-link-menu";
import StartingPoint from "~/app/_components/practice/starting-point";
import { ReadMoreButton } from "@ui/buttons";

export default function Page() {
  // TODO: fix back button so it scrolls off
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <>
      <PageColumnLayout
        leftButton={<BackToHome />}
        rightButton={
          <ReadMoreButton
            onClick={() => {
              setHelpOpen(true);
            }}
          />
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
