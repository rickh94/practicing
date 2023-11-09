import { useState, useCallback } from "react";
import { ScaleCrossFadeContent } from "~/app/_components/transitions";

type Section = {
  startingPoint: {
    measure: number;
    beat: number;
  };
  endingPoint: {
    measure: number;
    beat: number;
  };
  id: string;
};

type RepeatMode = "prepare" | "practice" | "break_success" | "break_fail";

// TODO: add option for sentence or grid layout
// TODO: add option for time signature changes
//
export default function StartingPoint() {
  const [mode, setMode] = useState<RepeatMode>("prepare");

  const setModePractice = useCallback(
    function () {
      setMode("practice");
    },
    [setMode],
  );

  const setModePrepare = useCallback(
    function () {
      setMode("prepare");
    },
    [setMode],
  );

  const setModeBreakSuccess = useCallback(
    function () {
      setMode("break_success");
    },
    [setMode],
  );

  const setModeBreakFail = useCallback(
    function () {
      setMode("break_fail");
    },
    [setMode],
  );

  return (
    <div className="relative left-0 top-0 w-full sm:mx-auto sm:max-w-5xl">
      <ScaleCrossFadeContent
        component={
          {
            prepare: <RepeatPrepare onReady={setModePractice} />,
            practice: (
              <RepeatPractice
                onSuccess={setModeBreakSuccess}
                onFail={setModeBreakFail}
              />
            ),
            break_success: <RepeatBreakSuccess restart={setModePrepare} />,
            break_fail: (
              <RepeatBreakFail
                restart={setModePrepare}
                resume={setModePractice}
              />
            ),
          }[mode]
        }
        id={mode}
      />
    </div>
  );
}

function RepeatPrepare({ onReady }: { onReady: () => void }) {
  return <div>Prepare</div>;
}

function RepeatPractice({
  onSuccess,
  onFail,
}: {
  onSuccess: () => void;
  onFail: () => void;
}) {
  return <div>Practice</div>;
}

function RepeatBreakSuccess({ restart }: { restart: () => void }) {
  return <div>Break Success</div>;
}

function RepeatBreakFail({
  restart,
  resume,
}: {
  restart: () => void;
  resume: () => void;
}) {
  return <div>Break Fail</div>;
}
