import Reveal from "./Reveal";

const principles = [
  {
    code: "VAL-01",
    title: "Technical rigour",
    body:
      "Methods before vibes. We cite, we ablate, we report what failed. Rigour is the baseline of respect for each other's time.",
  },
  {
    code: "VAL-02",
    title: "Open science",
    body:
      "Code, configs and negative results get shared. Reproducibility is a courtesy we extend to the next person on the bench.",
  },
  {
    code: "VAL-03",
    title: "Generous mentorship",
    body:
      "Senior members give real time — paper clinics, proposal reads, career calls — because someone once did it for us.",
  },
  {
    code: "VAL-04",
    title: "Universal belonging",
    body:
      "Open to women of every faith, culture, country and stage — Muslim, Christian, Jewish, Hindu, secular, and everyone else. No belief test, ever.",
  },
];

export default function Principles() {
  return (
    <section id="principles" className="scroll-mt-20 border-t border-line bg-carbon py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="led animate-blink-led bg-signal text-signal" />
              <span className="label-plate text-signal">Operating Values · 04 Enforced</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-lab sm:text-5xl">
              How we actually run.
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-lab/60">
              Not posters on a wall. These are the rules we hold each other to in
              reviews, in the channel, and at the bench.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.07} className="h-full">
              <div className="instrument-panel-dark flex h-full flex-col rounded-2xl p-7">
                <div className="flex items-center justify-between border-b border-line-dark pb-3.5">
                  <span className="label-plate text-signal">{p.code}</span>
                  <span className="led bg-signal/70" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-lab">{p.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.75] text-lab/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
