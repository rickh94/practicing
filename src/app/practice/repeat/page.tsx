"use client";

import { useState } from "react";
import { PageColumnLayout } from "~/app/_components/page-layout";
import { BackToHome } from "@ui/links";
import Help from "~/app/_components/practice/repeat-help";
import { TitleLinkMenu } from "~/app/_components/practice/title-link-menu";
import Repeat from "~/app/_components/practice/repeat";
import { ReadMoreButton } from "@ui/buttons";

// TODO: play with layout containers so content doesn't get stuck off to the left
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
        <Repeat />
      </PageColumnLayout>
    </>
  );
}
