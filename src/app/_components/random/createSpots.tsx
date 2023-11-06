import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { type Dispatch, type SetStateAction, useRef } from "react";

// TODO: maybe generate random ids for spots for better swapping

// TODO: redo this layout
export function CreateSpots({
  setSpots,
  spots,
}: {
  setSpots: Dispatch<SetStateAction<{ name: string }[]>>;
  spots: { name: string }[];
}) {
  const spotNameRef = useRef<HTMLInputElement>(null);
  const numSpotsRef = useRef<HTMLInputElement>(null);
  const [parent] = useAutoAnimate();

  function onAddSpot() {
    if (!spotNameRef.current) return;
    const name = spotNameRef.current.value;
    setSpots((prev) => [...prev, { name }]);
    spotNameRef.current.value = "";
  }

  function generateSomeSpots() {
    if (!numSpotsRef.current) return;
    const numSpots = parseInt(numSpotsRef.current?.value);
    const tmpSpots: { name: string }[] = [];
    for (let i = spots.length; i < numSpots + spots.length; i++) {
      tmpSpots.push({ name: `Spot #${i + 1}` });
    }
    setSpots((prev) => [...prev, ...tmpSpots]);
  }

  function deleteSpot(index: number) {
    setSpots((prev) => prev.filter((_, i) => i !== index));
  }

  function clearSpots() {
    setSpots([]);
  }

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
      <div className="col-span-full flex-col">
        <h2 className="text-xl font-bold">Your Spots</h2>
        {spots.length === 0 && (
          <p className="text-sm text-neutral-700">Add some spots below</p>
        )}
      </div>
      <ul className="col-span-full flex w-full flex-wrap gap-2" ref={parent}>
        {spots.map((spot, i) => (
          <li
            key={`${spot.name}`}
            className="inline-flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-700/10 px-2 py-1"
          >
            <div>{spot.name}</div>
            <button
              onClick={() => deleteSpot(i)}
              className="hover:text-red-500"
            >
              <span className="sr-only">Delete Spot</span>
              <TrashIcon className="h-4 w-4" />
            </button>
          </li>
        ))}
        {spots.length > 0 && (
          <li
            key="delete-spot-button"
            className="rounded-xl border border-red-800 bg-red-700/10  text-red-800 hover:bg-red-500/10 hover:text-red-600"
          >
            <button
              onClick={() => clearSpots()}
              className="inline-flex h-full w-full items-center gap-1 px-2 py-1 hover:text-red-500 "
            >
              <div>Delete All</div>
              <span className="sr-only">Delete Spot</span>
              <TrashIcon className="h-4 w-4" />
            </button>
          </li>
        )}
      </ul>
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-neutral-800">
          Spot Names
        </label>
        <p className="pb-2 text-sm text-neutral-700">
          Enter the name of each spot (press enter after each name).
        </p>
        <div className="flex gap-2">
          <input
            ref={spotNameRef}
            className="focusable w-42 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 focus:bg-neutral-700/20"
            type="text"
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                onAddSpot();
              }
            }}
          />
          <button
            className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 hover:bg-neutral-700/20"
            type="button"
            onClick={onAddSpot}
          >
            Add Spot
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-neutral-800">
          Generate Spots
        </label>
        <p className="pb-2 text-sm text-neutral-700">
          Automatically add a number of spots.
        </p>
        <label
          className="text-lg font-semibold text-neutral-800"
          htmlFor="num-spots"
        >
          How many spots to generate?
        </label>
        <div className="flex gap-2">
          <input
            id="num-spots"
            className="focusable w-20 rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 focus:bg-neutral-700/20"
            type="number"
            min="1"
            ref={numSpotsRef}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                generateSomeSpots();
              }
            }}
          />
          <button
            className="focusable rounded-xl bg-neutral-700/10 px-4 py-2 font-semibold text-neutral-800 transition duration-200 hover:bg-neutral-700/20"
            type="button"
            onClick={generateSomeSpots}
          >
            Add Spots
          </button>
        </div>
      </div>
    </div>
  );
}
