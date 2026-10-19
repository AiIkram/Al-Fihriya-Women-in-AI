import fatimaPortrait from "../assets/fatima-al-fihriya.png";
import Reveal from "./Reveal";

/** Portrait supplied for the Al-Fihriya heritage section. */
function HeritagePortrait() {
  return (
    <div className="instrument-panel-dark overflow-hidden rounded-2xl">
      <img src={fatimaPortrait} alt="Historical-style portrait representing Fatima al-Fihriya, holding a manuscript" className="block h-auto max-h-[760px] w-full object-cover object-top" loading="lazy" />
      <div className="grid grid-cols-3 gap-2 border-t border-line-dark px-5 py-4 sm:px-6">
        {[["Founded", "859 AD"], ["Location", "Fez, Morocco"], ["Founder", "Fatima al-Fihri"]].map(([k, v]) => (
          <div key={k}><div className="label-plate text-mist">{k}</div><div className="mt-1 font-mono text-[11px] font-bold text-signal sm:text-xs">{v}</div></div>
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
            <HeritagePortrait />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
