import Reveal from "./Reveal";
import { JoinButton } from "./JoinContext";
import { LINKEDIN_URL } from "../config";
import Emblem from "./Emblem";
import { Linkedin } from "lucide-react";

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
                <Linkedin size={16} /> LinkedIn
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
