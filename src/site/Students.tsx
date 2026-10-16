import Reveal from "./Reveal";
import { JoinButton } from "./JoinContext";

export default function Students() {
  return (
    <section id="students" className="scroll-mt-20 border-t border-line bg-lab py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-2.5">
            <span className="led animate-blink-led bg-signal-deep text-signal-deep" />
            <span className="label-plate text-graphite">
              Students &amp; Early Career · Welcome
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
            You do not need to be an expert to join.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-[1.8] text-steel">
            Undergraduates, master's students and first-year PhDs are explicitly
            welcome. Ask the basic question. Nobody here got good by pretending they
            already knew.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="instrument-panel mt-10 rounded-2xl p-6 text-left sm:p-8">
            <span className="label-plate text-signal-deep">What members actually get</span>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Paper clinics", "Line-by-line feedback before you submit."],
                ["Code review", "Someone will read your training script."],
                ["Proposal reads", "PhD and grant applications, honestly critiqued."],
                ["Career calls", "Talk to people two steps ahead of you."],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 border-t border-line pt-3.5">
                  <span className="led mt-1.5 shrink-0 bg-signal-deep" />
                  <div>
                    <div className="font-display text-[15px] font-bold text-carbon">{k}</div>
                    <div className="mt-0.5 text-[14px] leading-relaxed text-steel">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex justify-center">
            <JoinButton className="!rounded-lg !px-8 !py-3.5">
              Join the community
            </JoinButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
