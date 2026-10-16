import { CalendarClock, Globe2, Radio } from "lucide-react";
import Reveal from "./Reveal";

const gatherings = [
  {
    code: "OP-01",
    title: "Monthly Catch Up",
    cadence: "Last Friday of each month",
    time: "20:00 Paris",
    body:
      "Informal video circle to report progress, unblock each other, review draft figures, and share wins. There is no pressure to prepare anything. Just come as you are.",
    status: "Active",
  },
  {
    code: "OP-02",
    title: "Work and Life",
    cadence: "Last Friday of January",
    time: "20:00 Paris",
    body:
      "Dedicated session on the real trade-offs of research: family, caregiving, funding pressure, and protecting the parts of life that make the work possible.",
    status: "Active",
  },
  {
    code: "OP-03",
    title: "Academic Planning",
    cadence: "Last Friday of May",
    time: "20:00 Paris",
    body:
      "Forward planning for the year: conference deadlines, summer schools, journal targets, and forming cross-institution co-author teams before the cutoff.",
    status: "Active",
  },
  {
    code: "OP-04",
    title: "Student Mentorship",
    cadence: "Last Friday of August, starting in 2027",
    time: "20:00 Paris",
    body:
      "Students submit questions through a form beforehand; senior researchers and engineers answer them live, with follow-ups in the comms channel.",
    status: "Scheduled",
  },
];

const zones = [
  ["Paris", "20:00"],
  ["Algiers", "19:00"],
  ["London", "19:00"],
  ["Cairo", "21:00"],
  ["Dubai", "22:00"],
  ["New York", "14:00"],
  ["São Paulo", "15:00"],
  ["Singapore", "02:00"],
];

export default function Gatherings() {
  return (
    <section id="gatherings" className="scroll-mt-20 border-t border-line bg-lab-panel/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2.5">
                <CalendarClock size={15} className="text-signal-deep" />
                <span className="label-plate text-graphite">
                  Community Gatherings · 20:00 Paris time
                </span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
                The cadence that keeps us moving.
              </h2>
              <p className="mt-4 max-w-xl text-[16.5px] leading-[1.75] text-steel">
                We plan a few regular online gatherings throughout the year. Joining is optional, and we will share a summary afterwards for anyone who cannot make it.
              </p>
            </div>

            {/* world clock block */}
            <div className="instrument-panel rounded-2xl p-5">
              <div className="flex items-center gap-2">
                <Globe2 size={14} className="text-signal-deep" />
                <span className="label-plate text-graphite">Local conversion</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {zones.map(([city, time]) => (
                  <div key={city} className="rounded-lg border border-line bg-lab px-2.5 py-2">
                    <div className="label-plate text-mist">{city}</div>
                    <div className="font-mono text-[13px] font-bold text-carbon">{time}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-mist">
                Paris changes between CET and CEST during the year, so we will confirm the local time in each event announcement.
              </p>
            </div>
          </div>
        </Reveal>

        {/* schedule rail */}
        <div className="mt-12 space-y-3">
          {gatherings.map((t, i) => (
            <Reveal key={t.code} delay={i * 0.06}>
              <article className="instrument-panel flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-start">
                {/* rail */}
                <div className="flex shrink-0 flex-col items-center sm:w-28">
                  <div className="flex items-center gap-2">
                    <span className="led animate-blink-led bg-signal-deep text-signal-deep" />
                    <span className="label-plate text-signal-deep">{t.code}</span>
                  </div>
                  <span className="mt-2 h-px w-full bg-line" />
                  <span className="mt-2 font-mono text-[11px] font-bold text-carbon">
                    {t.time}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h3 className="font-display text-lg font-bold text-carbon sm:text-xl">
                      {t.title}
                    </h3>
                    <span
                      className={`rounded border px-1.5 py-0.5 label-plate ${
                        t.status === "Active"
                          ? "border-signal/50 bg-signal/12 text-signal-deep"
                          : "border-line bg-lab-panel text-mist"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11.5px] text-slate-lab">{t.cadence}</p>
                  <p className="mt-2.5 text-[15px] leading-[1.75] text-steel">{t.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="instrument-panel-dark mt-8 flex items-start gap-3.5 rounded-2xl p-5">
            <Radio size={17} className="mt-0.5 shrink-0 text-signal" />
            <p className="text-[13.5px] leading-relaxed text-lab/70">
              <span className="label-plate mr-2 text-signal">Access</span>
              Links, agendas and question forms are released in the private comms
              channel before each session. Recordings and summaries are archived for
              members in every timezone.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
