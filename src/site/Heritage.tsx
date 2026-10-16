import Reveal from "./Reveal";

/** Blueprint-style astrolabe / observatory instrument, drawn in SVG */
function HeritageInstrument() {
  return (
    <div className="instrument-panel-dark relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-line-dark pb-3">
        <span className="label-plate text-signal">Artefact · Plan 859-AD</span>
        <span className="label-plate text-mist">Al-Qarawiyyin, Fez</span>
      </div>

      <svg viewBox="0 0 420 340" className="mt-4 h-auto w-full" role="img" aria-label="Geometric plan of a classical observatory arch and astrolabe">
        {/* blueprint arch */}
        <path
          d="M62 320 V170 C62 88 122 26 210 26 C298 26 358 88 358 170 V320"
          fill="none"
          stroke="#C5A880"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />
        <path
          d="M84 320 V176 C84 104 136 50 210 50 C284 50 336 104 336 176 V320"
          fill="none"
          stroke="#C5A880"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        {/* ground line */}
        <line x1="30" y1="320" x2="390" y2="320" stroke="#C5A880" strokeOpacity="0.4" strokeWidth="1.2" />

        {/* astrolabe rings */}
        <g transform="translate(210,180)">
          <circle r="96" fill="none" stroke="#C5A880" strokeOpacity="0.35" strokeWidth="1" />
          <circle r="74" fill="none" stroke="#7BA3C9" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 6" />
          <circle r="50" fill="none" stroke="#C5A880" strokeOpacity="0.5" strokeWidth="1" />
          <circle r="26" fill="none" stroke="#C5A880" strokeOpacity="0.7" strokeWidth="1.2" />

          {/* axes */}
          <line x1="-96" y1="0" x2="96" y2="0" stroke="#C5A880" strokeOpacity="0.22" />
          <line x1="0" y1="-96" x2="0" y2="96" stroke="#C5A880" strokeOpacity="0.22" />

          {/* rete pointers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const x = Math.cos(a) * 74;
            const y = Math.sin(a) * 74;
            return (
              <g key={i}>
                <line x1="0" y1="0" x2={x} y2={y} stroke="#C5A880" strokeOpacity="0.2" />
                <circle cx={x} cy={y} r="2.4" fill="#C5A880" />
              </g>
            );
          })}

          <circle r="6" fill="#C5A880" />
          <circle r="11" fill="none" stroke="#C5A880" strokeOpacity="0.5" />
        </g>

        {/* scale ticks */}
        <g stroke="#C5A880" strokeOpacity="0.4">
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={i} x1={30 + i * 15} y1="320" x2={30 + i * 15} y2={i % 5 === 0 ? 328 : 325} />
          ))}
        </g>

        <text x="210" y="296" textAnchor="middle" className="fill-lab font-mono text-[11px] font-semibold tracking-[0.2em]">
          AL-QARAWIYYIN
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line-dark pt-3">
        {[
          ["Founded", "859 AD"],
          ["Status", "Operating"],
          ["Founder", "F. al-Fihri"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="label-plate text-mist">{k}</div>
            <div className="font-mono text-[12px] font-bold text-signal">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Heritage() {
  return (
    <section id="heritage" className="scroll-mt-20 border-t border-line bg-lab-panel/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="led bg-signal-deep text-signal-deep" />
                <span className="label-plate text-graphite">Heritage Record · 859 AD</span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
                Named after the woman who built the first university.
              </h2>
              <div className="mt-6 space-y-5 text-[16.5px] leading-[1.8] text-steel">
                <p>
                  In ninth-century Fez, <strong className="font-semibold text-carbon">Fatima al-Fihri</strong>{" "}
                  used her inheritance to establish al-Qarawiyyin — recognised by UNESCO
                  and historians as the oldest continuously operating institution of
                  higher learning in the world.
                </p>
                <p>
                  It has been running for over eleven centuries. That is the standard we
                  hold ourselves to: build things that outlast you, and hand them on in
                  better condition.
                </p>
                <p>
                  <strong className="font-semibold text-carbon">Al-Fihriya Women in AI</strong> applies
                  the same instinct to machine intelligence — rigorous methods, shared
                  tooling, and a culture where women set the technical agenda rather
                  than being invited into it.
                </p>
              </div>

              <div className="mt-7 border-l-2 border-signal pl-5">
                <p className="font-display text-[17px] font-medium leading-snug text-carbon">
                  Our aim is simple: build the research environment we wished we had
                  walked into.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <HeritageInstrument />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
