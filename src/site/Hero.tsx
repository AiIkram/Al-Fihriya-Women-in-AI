import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Activity, Cpu, Radio, Wrench } from "lucide-react";
import Emblem from "./Emblem";

const stats = [
  { k: "Fields", v: "ALL AI DOMAINS" },
  { k: "Cadence", v: "MONTHLY · 20:00 CET" },
  { k: "Access", v: "WOMEN · EVERYWHERE" },
  { k: "Mode", v: "PEER-LED MENTORSHIP" },
];

const boot = [
  { k: "UNIT", v: "AL-FIHRIYA / W_AI-01" },
  { k: "DOMAIN", v: "ML · CV · RL · NLP · MED-AI" },
  { k: "HERITAGE", v: "AL-QARAWIYYIN · 859 AD" },
  { k: "APPROACH", v: "OPEN SCIENCE / SHARED KNOWLEDGE" },
  { k: "STATE", v: "COMMUNITY ACTIVE", live: true },
];

/** Hero: carbon instrument bay with the official emblem and live readouts */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="grid-blueprint relative overflow-hidden pt-28 pb-16 sm:pt-36">
      {/* soft instrument light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 80% 15%, rgba(197,168,128,0.14), transparent 70%), radial-gradient(50% 40% at 5% 85%, rgba(123,163,201,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          {/* ---------- copy column ---------- */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="led animate-blink-led bg-signal-deep text-signal-deep" />
              <span className="label-plate text-graphite">
                Women in Artificial Intelligence · Research Community
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.02em] text-carbon sm:text-6xl lg:text-[4.1rem]"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Build the machines
              <br />
              that{" "}
              <span className="relative inline-block">
                <span className="relative z-10">think</span>
                <span className="absolute inset-x-0 bottom-1.5 z-0 h-3 bg-signal/45" />
              </span>
              .
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-[17px] leading-[1.8] text-steel"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              Al-Fihriyya is an international research community for women engineers,
              academics, and students working across{" "}
              <strong className="font-semibold text-carbon">
                machine learning, computer vision, robotics, neuroscience, and medical AI
              </strong>
              . We share code, discuss papers, and help each other grow as researchers. We believe good research is stronger when knowledge is shared.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <a
                href="#join"
                className="btn-lab group inline-flex items-center gap-2.5 rounded-lg px-7 py-3.5 text-[13px]"
              >
                JOIN THE COMMUNITY
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#bench"
                className="link-tech inline-flex items-center gap-2 rounded-lg border border-line bg-white px-6 py-3.5 font-mono text-[13px] font-semibold text-graphite transition-colors hover:border-signal"
              >
                <Activity size={15} className="text-signal-deep" />
                RUN INSTRUMENT BENCH
              </a>
            </motion.div>

            {/* spec strip */}
            <motion.dl
              className="mt-11 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
            >
              {stats.map((s) => (
                <div key={s.k}>
                  <dt className="label-plate text-mist">{s.k}</dt>
                  <dd className="mt-1 font-mono text-[12px] font-semibold leading-snug text-carbon">
                    {s.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- instrument column ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="instrument-panel-dark relative overflow-hidden rounded-2xl">
              {/* bezel header */}
              <div className="flex items-center justify-between border-b border-line-dark bg-carbon-soft px-4 py-2.5">
                <span className="label-plate text-signal">Module · Emblem Core</span>
                <div className="flex items-center gap-1.5">
                  <span className="led bg-signal animate-blink-led text-signal" />
                  <span className="led bg-volt text-volt" />
                  <span className="led bg-graphite" />
                </div>
              </div>

              {/* emblem bay */}
              <div className="grid-calibration relative grid place-items-center px-6 py-12">
                <Emblem size={168} theme="dark" animate />
                <div className="mt-6 text-center">
                  <div className="font-display text-xl font-bold tracking-[0.14em] text-lab">
                    AL-FIHRIYA
                  </div>
                  <div className="mt-1 label-plate text-signal">
                    Women in Artificial Intelligence
                  </div>
                </div>

                {/* corner brackets */}
                <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-signal/50" />
                <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-signal/50" />
                <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-signal/50" />
                <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-signal/50" />
              </div>

              {/* boot log */}
              <div className="border-t border-line-dark px-4 py-3">
                <div className="space-y-1.5">
                  {boot.map((b, i) => (
                    <motion.div
                      key={b.k}
                      className="flex items-baseline justify-between gap-4 border-b border-line-dark/70 py-1.5 last:border-0"
                      initial={{ opacity: 0, x: reduce ? 0 : -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.09, duration: 0.35 }}
                    >
                      <span className="label-plate text-mist">{b.k}</span>
                      <span
                        className={`font-mono text-[11px] font-medium ${
                          b.live ? "text-signal" : "text-lab/80"
                        }`}
                      >
                        {b.live && <span className="led mr-1.5 inline-block bg-signal align-middle" />}
                        {b.v}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* footer gauge */}
              <div className="flex items-center justify-between border-t border-line-dark bg-carbon-soft px-4 py-2.5">
                <span className="label-plate text-mist">Load</span>
                <div className="mx-3 flex h-2 flex-1 gap-[3px]">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-[1px]"
                      style={{
                        background: i < 17 ? "#C5A880" : "#1E2A3A",
                        opacity: i < 17 ? 0.45 + (i / 24) * 0.55 : 1,
                      }}
                    />
                  ))}
                </div>
                <span className="label-plate text-signal">17/24</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* domain bus */}
        <div className="mt-14 flex flex-wrap items-center gap-2.5 border-t border-line pt-7">
          <span className="label-plate text-mist">Domain Bus →</span>
          {[
            { icon: Cpu, label: "Foundation Models" },
            { icon: Radio, label: "Robotics & Control" },
            { icon: Activity, label: "Medical Imaging" },
            { icon: Wrench, label: "MLOps & Tooling" },
          ].map((d) => (
            <span
              key={d.label}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2"
            >
              <d.icon size={14} className="text-signal-deep" />
              <span className="font-mono text-[11px] font-semibold text-graphite">{d.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
