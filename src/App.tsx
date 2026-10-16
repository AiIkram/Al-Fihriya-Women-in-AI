import Nav from "./site/Nav";
import Hero from "./site/Hero";
import Disciplines from "./site/Disciplines";
import InstrumentPanel from "./site/InstrumentPanel";
import Heritage from "./site/Heritage";
import Gatherings from "./site/Gatherings";
import Comms from "./site/Comms";
import Principles from "./site/Principles";
import Students from "./site/Students";
import Faq from "./site/Faq";
import FinalCta from "./site/FinalCta";
import Footer from "./site/Footer";
import { JoinProvider } from "./site/JoinContext";
import Reveal from "./site/Reveal";

export default function App() {
  return (
    <JoinProvider>
      <div className="min-h-screen bg-lab font-sans text-graphite antialiased selection:bg-signal/40 selection:text-carbon">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-carbon focus:px-4 focus:py-2.5 focus:font-mono focus:text-[12px] focus:text-signal"
        >
          Skip to main content
        </a>

        <Nav />

        <main id="main">
          <Hero />
          <Disciplines />

          {/* INSTRUMENT BENCH */}
          <section id="bench" className="scroll-mt-20 border-t border-line bg-lab-panel/50 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5">
              <Reveal>
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="led animate-blink-led bg-signal-deep text-signal-deep" />
                    <span className="label-plate text-graphite">
                      Instrument Bench · Interactive
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
                    Look inside the models.
                  </h2>
                  <p className="mt-4 text-[16.5px] leading-[1.75] text-steel">
                    Four live instruments from the research bench. Switch channels to
                    trace an activation signal, sweep a 6-DOF arm, follow the training
                    data bus, or watch gradient descent settle into a minimum.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10">
                  <InstrumentPanel />
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Analysing", "What the signal is telling you"],
                    ["Controlling", "How hardware follows the model"],
                    ["Optimising", "Why training converges at all"],
                  ].map(([k, v]) => (
                    <div key={k} className="instrument-panel rounded-xl p-5">
                      <div className="label-plate text-signal-deep">{k}</div>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-steel">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <Heritage />
          <Gatherings />
          <Comms />
          <Principles />
          <Students />
          <Faq />
          <FinalCta />
        </main>

        <Footer />
      </div>
    </JoinProvider>
  );
}
