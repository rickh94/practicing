import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { PageColumnLayout } from "~/components/layout";
import { BackToHome } from "~/components/links";

ChartJS.register(
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
);

export default function About() {
  return (
    <>
      <PageColumnLayout leftButton={<BackToHome />}>
        <h1 className="px-4 pb-1 pt-4 text-5xl font-bold text-neutral-800">
          Better Practicing
        </h1>
        <div className="prose prose-neutral grid w-full sm:max-w-4xl lg:max-w-6xl lg:grid-cols-2 lg:gap-x-6">
          <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">The Problem: From the Top</h2>
            <blockquote className="mb-0 ml-2 border-l-4 border-neutral-800/50 pl-2 text-lg">
              I’ll just start at the beginning and play through so I can find
              out where the mistakes are. Then I can work on them.
            </blockquote>
            <p>
              This <em className="font-medium italic text-black">feels</em> like
              a perfectly reasonable approach right? It totally goes with human
              nature, and seems like an easy way to organize a practice session.
              Start at the beginning, just like the{" "}
              <em className="italic">Sound of Music</em>. Unfortunately, you end
              up with a really uneven practicing pattern. I think of it looking
              something like this:
            </p>
            <Line
              options={{
                responsive: true,
                scales: {
                  x: {
                    type: "category",
                    labels: ["Start of piece", "", "", "", "", "End of piece"],
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: "Total Practice Time",
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: false,
                  },
                },
              }}
              data={{
                datasets: [
                  {
                    fill: true,
                    label: "Descending line chart",
                    data: [16, 8, 4, 2, 1, 0.5],
                    backgroundColor: "rgba(249, 168, 212, 0.5)", // tailwind pink 300
                    borderColor: "rgba(249, 168, 212, 1)",
                  },
                ],
              }}
              className="max-w-2xl self-center rounded bg-neutral-50/60 p-4 shadow"
            />
            <aside className="text-center text-sm text-neutral-700">
              This is a visualization not meant to represent any real data.
            </aside>
            <p>
              When you always start at the beginning, the{" "}
              <em className="font-medium italic text-black">beginning</em> of
              the piece gets a ton of practicing, but as you get tired or dig
              into mistakes, you often don’t make it to the end, and it
              inevitably falls behind. If, somehow, this doesn’t happen to you,
              congratulations, you probably don’t need this.
            </p>
          </section>
          <section className="border-t border-neutral-500 lg:border-l lg:border-t-0 lg:pl-4">
            <h2 className="mt-4 text-2xl font-bold text-black lg:mt-12">
              The Solution: From the…middle?
            </h2>
            <h3 className="text-xl font-semibold text-black">
              Track Your Spots
            </h3>
            <p>
              Realistically, your mistakes probably aren’t moving around
              randomly. They’re going to be in the same place as yesterday. Skip
              the playthrough and go directly to the places giving you trouble.
              Instead of spending a lot of time playing the sections you already
              know, go deep on the spots that need the most help. It{" "}
              <em className="font-medium italic text-black">feels</em> less
              productive in the moment, but in just a few days, you’ll see huge
              results.
            </p>
            <h3 className="text-xl font-semibold text-black">Mix it Up</h3>
            <p>
              Of course, if you play the same spots in the same order every day,
              you may fall victim to the same fall-off as starting at the
              beginning. Much better would be to mix up the order of the spots
              that you’re practicing so they’ll each get an appropriate amount
              of practice.
            </p>
            <h3 className="text-xl font-semibold text-black">
              Spread them out
            </h3>
            <p>
              Practicing all your spots every day is great, but at a certain
              point, you might want to spread them out more. This gives you more
              time to practice other spots, but also solidifies them in your
              mind by forcing you to access them from longer-term memory.
            </p>
            <div className="flex">
              <Link
                className="flex flex-col gap-4 rounded-xl bg-neutral-700/10 px-6 py-4 text-neutral-700 no-underline hover:bg-neutral-700/20"
                href="/random"
              >
                <h3 className="m-0 p-0 text-xl font-bold text-neutral-800 no-underline">
                  Get Started →
                </h3>
              </Link>
            </div>
          </section>
        </div>
      </PageColumnLayout>
    </>
  );
}
