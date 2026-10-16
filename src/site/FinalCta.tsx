import Reveal from "./Reveal";
import { JoinButton } from "./JoinContext";
import { LINKEDIN_URL } from "../config";
import Emblem from "./Emblem";

export default function FinalCta() {
  return (
    <section id="join" className="scroll-mt-20 relative overflow-hidden border-t border-line bg-carbon py-24 sm:py-32">
      {/* instrument light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 40%, rgba(197,168,128,0.14), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="mx-auto mb-7 w-fit rounded-2xl border border-line-dark bg-carbon-soft p-4">
            <Emblem size={64} theme="dark" animate />
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <span className="led animate-blink-led bg-signal text-signal" />
            <span className="label-plate text-signal">Community · Open to Connect</span>
          </div>

          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-lab sm:text-5xl lg:text-[3.5rem]">
            Intelligence is built by the people who show up.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-[1.8] text-lab/65">
            Bring your models, your half-finished experiments, and the questions you
            have been sitting on. We will read them properly.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <JoinButton className="!rounded-lg !px-8 !py-4 !text-[13px]">
              Join the Community
            </JoinButton>
            {LINKEDIN_URL && (
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line-dark px-6 py-4 font-mono text-[12.5px] font-semibold text-lab transition-colors hover:border-signal hover:text-signal"
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

          <p className="mt-7 font-mono text-[11px] text-mist">
            No cost · No publication requirement · All backgrounds welcome
          </p>
        </Reveal>
      </div>
    </section>
  );
}
