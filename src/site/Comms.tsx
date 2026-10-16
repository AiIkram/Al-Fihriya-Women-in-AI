import { Send, Megaphone, GitBranch, HeartHandshake, Plane } from "lucide-react";
import Reveal from "./Reveal";
import { JoinButton } from "./JoinContext";
import { LINKEDIN_URL } from "../config";

const channels = [
  {
    icon: Megaphone,
    code: "BUS-01",
    title: "Opportunity feed",
    body:
      "Calls for papers, conference deadlines, funded PhD and postdoc openings, fellowships, and summer schools. We share opportunities as we come across them.",
  },
  {
    icon: GitBranch,
    code: "BUS-02",
    title: "Technical threads",
    body:
      "Paper breakdowns, reproduction attempts, debugging help, benchmark code, environment configs, and honest reviews of what actually worked.",
  },
  {
    icon: HeartHandshake,
    code: "BUS-03",
    title: "Support channel",
    body:
      "A place to ask career questions, talk through setbacks, exchange practical advice, and be honest about balancing research with the rest of life.",
  },
];

export default function Comms() {
  return (
    <section id="comms" className="scroll-mt-20 border-t border-line bg-lab py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <Send size={15} className="text-signal-deep" />
              <span className="label-plate text-graphite">Comms Bus · Private Channel</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
              Where the work actually happens.
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-steel">
              The site is our public face. Between sessions, the private channel is
              where code gets shared, papers get torn apart kindly, and questions get
              answered within hours rather than weeks.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.code} delay={i * 0.08} className="h-full">
                <div className="instrument-panel flex h-full flex-col rounded-2xl p-6">
                  <div className="flex items-center justify-between border-b border-line pb-3.5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-lab-panel text-carbon">
                      <Icon size={18} />
                    </span>
                    <span className="label-plate text-mist">{c.code}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-carbon">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.75] text-steel">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* travel / meetup strip */}
        <Reveal delay={0.12}>
          <div className="instrument-panel-dark mt-6 grid gap-6 rounded-2xl p-7 sm:p-8 lg:grid-cols-[1.25fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line-dark bg-carbon-soft text-signal">
                <Plane size={19} />
              </span>
              <div>
                <span className="label-plate text-signal">Field deployment</span>
                <h3 className="mt-1.5 font-display text-xl font-bold text-lab sm:text-2xl">
                  Travelling to a conference? Post it.
                </h3>
                <p className="mt-2 max-w-xl text-[14.5px] leading-[1.7] text-lab/65">
                  Members can share plans for conferences and workshops, connect with others attending, and arrange meetups or explore opportunities to work together.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <JoinButton className="!rounded-lg">Join the channel</JoinButton>
              {LINKEDIN_URL && (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-lg border border-line-dark px-5 py-3 font-mono text-[12px] font-semibold text-lab transition-colors hover:border-signal hover:text-signal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 font-mono text-[11px] leading-relaxed text-mist">
            * The channel is private and manually verified. We never post member details
            publicly, and no data is collected by this website.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
