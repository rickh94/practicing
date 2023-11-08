import { type PracticeSummaryItem } from "~/lib/random";

// TODO: implement some kind of sorting, or find a way to retain entered order,
// possibly switch to a hashmap
export default function Summary({
  summary,
  setup,
  practice,
}: {
  summary: PracticeSummaryItem[];
  setup: () => void;
  practice: () => void;
}) {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-12">
        <table className="min-w-full divide-y divide-neutral-700">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 sm:pl-0"
              >
                Spot Name
              </th>
              <th
                scope="col"
                className="py-3 pl-4 pr-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 sm:pl-0"
              >
                Times Practiced
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {summary.map(({ name, reps, id }, idx) => (
              <tr
                key={id}
                className={`${idx % 2 === 0 && "bg-neutral-700/10"}`}
              >
                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-center font-medium text-neutral-900 sm:pl-0">
                  {name}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-center text-neutral-800">
                  {reps}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        <button
          className="focusable rounded-xl bg-amber-700/10 px-4 py-2 font-semibold text-amber-800 transition duration-200 hover:bg-amber-700/20"
          type="button"
          onClick={setup}
        >
          Back to Setup
        </button>
        <button
          className="focusable rounded-xl bg-emerald-700/10 px-4 py-2 font-semibold text-emerald-800 transition duration-200 hover:bg-emerald-700/20"
          type="button"
          onClick={practice}
        >
          Practice More
        </button>
      </div>
    </>
  );
}
