import { useState, useEffect } from "react";

/**
 * OSCILLOSCOPE + KINEMATIC ROBOTICS INSTRUMENT PANEL
 * Live interactive SVG instrumentation with four calibrated modes.
 */

type Mode = "oscilloscope" | "kinematics" | "pipeline" | "servo";

const MODES: { id: Mode; label: string; code: string }[] = [
  { id: "oscilloscope", label: "Signal Analyser", code: "CH-01" },
  { id: "kinematics", label: "Robotic Kinematics", code: "ARM-6DOF" },
  { id: "pipeline", label: "Training Pipeline", code: "DATA-BUS" },
  { id: "servo", label: "Loss Optimiser", code: "SGD-CTRL" },
];

export default function InstrumentPanel() {
  const [mode, setMode] = useState<Mode>("oscilloscope");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(i);
  }, []);

  /* Deterministic pseudo-noise so the trace feels alive but stable */
  const noise = (i: number, amp: number) =>
    Math.sin(i * 0.7 + tick * 0.6) * amp +
    Math.sin(i * 1.9 + tick * 0.35) * amp * 0.45;

  return (
    <div className="instrument-panel relative overflow-hidden rounded-2xl">
      {/* Faceplate header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-lab-panel/70 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="led animate-blink-led bg-signal-deep text-signal-deep" />
          <span className="label-plate text-graphite">Live Instrumentation</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="label-plate text-mist">Power</span>
          <span className="led bg-signal text-signal animate-blink-led" />
        </div>
      </div>

      {/* Mode selector bus */}
      <div className="flex flex-wrap gap-1.5 border-b border-line bg-lab p-3">
        {MODES.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              aria-pressed={active}
              className={`group flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all ${
                active
                  ? "border-signal bg-carbon text-signal"
                  : "border-line bg-white text-slate-lab hover:border-steel hover:text-graphite"
              }`}
            >
              <span className={`led ${active ? "bg-signal text-signal animate-blink-led" : "bg-line"}`} />
              <span className="flex flex-col leading-tight">
                <span className="label-plate">{m.label}</span>
                <span className={`font-mono text-[9px] ${active ? "text-signal/70" : "text-mist"}`}>
                  {m.code}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Screen viewport */}
      <div className="grid-calibration relative m-4 aspect-[16/9] overflow-hidden rounded-xl bg-carbon p-2">
        {/* scan sweep */}
        <div className="animate-calibrate pointer-events-none absolute inset-x-0 top-0 h-full">
          <div className="h-14 w-full bg-gradient-to-b from-transparent via-signal/10 to-transparent" />
        </div>

        {/* Corner reticles */}
        {[
          "left-2 top-2 border-l border-t",
          "right-2 top-2 border-r border-t",
          "left-2 bottom-2 border-l border-b",
          "right-2 bottom-2 border-r border-b",
        ].map((c) => (
          <span key={c} className={`absolute h-4 w-4 border-signal/40 ${c}`} />
        ))}

        <div className="relative h-full w-full">
          {mode === "oscilloscope" && (
            <svg viewBox="0 0 640 320" className="h-full w-full" role="img" aria-label="Oscilloscope signal trace of a neural activation waveform">
              {/* graticule */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="320" stroke="#C5A880" strokeOpacity="0.09" />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 80} x2="640" y2={i * 80} stroke="#C5A880" strokeOpacity="0.09" />
              ))}
              <line x1="0" y1="160" x2="640" y2="160" stroke="#C5A880" strokeOpacity="0.3" strokeDasharray="6 6" />

              {/* live trace */}
              <polyline
                points={Array.from({ length: 129 })
                  .map((_, i) => {
                    const x = i * 5;
                    const y = 160 + noise(i, 78);
                    return `${x},${y.toFixed(1)}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#C5A880"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* ghost trace */}
              <polyline
                points={Array.from({ length: 129 })
                  .map((_, i) => `${i * 5},${(160 + noise(i + 9, 46)).toFixed(1)}`)
                  .join(" ")}
                fill="none"
                stroke="#7BA3C9"
                strokeOpacity="0.55"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* active probe marker */}
              <circle cx="640" cy={160 + noise(128, 78)} r="5" fill="#C5A880" />

              <text x="14" y="26" className="fill-signal font-mono text-[11px]">
                CH1 ▲ ACTIVATION σ(z) — 20 kHz SAMPLE
              </text>
              <text x="14" y="306" className="fill-volt font-mono text-[11px]">
                CH2 ▬ GRADIENT ∇L(θ) — REFERENCE
              </text>
            </svg>
          )}

          {mode === "kinematics" && (
            <svg viewBox="0 0 640 320" className="h-full w-full" role="img" aria-label="Six degree of freedom robotic arm kinematic diagram">
              {/* work envelope */}
              {[
                [130, 0.16],
                [105, 0.24],
                [80, 0.34],
              ].map(([r, o], i) => (
                <path
                  key={i}
                  d={`M ${240 - r} 300 A ${r} ${r} 0 0 1 ${240 + r} 300`}
                  fill="none"
                  stroke="#7BA3C9"
                  strokeOpacity={o as number}
                  strokeDasharray="3 5"
                />
              ))}

              {/* base */}
              <rect x="190" y="286" width="100" height="18" rx="4" fill="#1C2B42" stroke="#4A5564" />
              <text x="240" y="312" textAnchor="middle" className="fill-mist font-mono text-[10px]">
                BASE · θ₁
              </text>

              {/* joint nodes and links */}
              <g className="animate-servo">
                <line x1="240" y1="286" x2="300" y2="196" stroke="#C5A880" strokeWidth="9" strokeLinecap="round" />
                <line x1="300" y1="196" x2="214" y2="126" stroke="#C5A880" strokeWidth="7" strokeLinecap="round" />
                <line x1="214" y1="126" x2="272" y2="72" stroke="#C5A880" strokeWidth="5" strokeLinecap="round" />
                <line x1="272" y1="72" x2="330" y2="44" stroke="#7BA3C9" strokeWidth="3" strokeLinecap="round" />

                {/* servo joints */}
                {[
                  [240, 286, "J1"],
                  [300, 196, "J2"],
                  [214, 126, "J3"],
                  [272, 72, "J4"],
                ].map(([cx, cy, label]) => (
                  <g key={label as string}>
                    <circle cx={cx as number} cy={cy as number} r="10" fill="#0F1A2C" stroke="#C5A880" strokeWidth="2" />
                    <circle cx={cx as number} cy={cy as number} r="3" fill="#C5A880" />
                    <text
                      x={(cx as number) + 15}
                      y={(cy as number) - 10}
                      className="fill-signal font-mono text-[10px]"
                    >
                      {label}
                    </text>
                  </g>
                ))}

                {/* end effector gripper */}
                <g>
                  <path d="M330 44 L352 30 M330 44 L352 58" stroke="#C4A06A" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="330" cy="44" r="6" fill="#C4A06A" />
                  <text x="360" y="48" className="fill-thermo font-mono text-[10px]">
                    GRIPPER
                  </text>
                </g>
              </g>

              <text x="410" y="88" className="fill-signal font-mono text-[11px]">
                FORWARD KINEMATICS
              </text>
              <text x="410" y="106" className="fill-mist font-mono text-[10px]">
                x = Σ Lᵢ·cos(Σθⱼ)
              </text>
              <text x="410" y="122" className="fill-mist font-mono text-[10px]">
                y = Σ Lᵢ·sin(Σθⱼ)
              </text>
              <text x="410" y="146" className="fill-volt font-mono text-[10px]">
                PAYLOAD: 4.2 kg
              </text>
              <text x="410" y="162" className="fill-volt font-mono text-[10px]">
                REPEATABILITY: ±0.02 mm
              </text>
            </svg>
          )}

          {mode === "pipeline" && (
            <svg viewBox="0 0 640 320" className="h-full w-full" role="img" aria-label="Data pipeline and model training flow diagram">
              {[
                { x: 24, label: "INGEST", sub: "DICOM / NIfTI", color: "#7BA3C9" },
                { x: 176, label: "PREPROC", sub: "NORMALISE", color: "#7BA3C9" },
                { x: 328, label: "ENCODE", sub: "3D ViT-B", color: "#C5A880" },
                { x: 480, label: "HEAD", sub: "SEG / CLS", color: "#C5A880" },
              ].map((b, i) => (
                <g key={b.label}>
                  <rect
                    x={b.x}
                    y="120"
                    width="136"
                    height="76"
                    rx="10"
                    fill="#152033"
                    stroke={b.color}
                    strokeWidth="1.6"
                  />
                  <text x={b.x + 68} y="152" textAnchor="middle" className="fill-lab font-mono text-[12px] font-bold">
                    {b.label}
                  </text>
                  <text x={b.x + 68} y="170" textAnchor="middle" className="fill-mist font-mono text-[10px]">
                    {b.sub}
                  </text>

                  {i < 3 && (
                    <line
                      x1={b.x + 136}
                      y1="158"
                      x2={b.x + 152}
                      y2="158"
                      stroke={b.color}
                      strokeWidth="2"
                      strokeDasharray="6 5"
                      className="animate-flow"
                    />
                  )}
                </g>
              ))}

              {/* feedback loss loop */}
              <path
                d="M548 196 L548 250 L92 250 L92 196"
                fill="none"
                stroke="#C4A06A"
                strokeWidth="2"
                strokeDasharray="7 6"
                className="animate-flow"
              />
              <polygon points="92,204 86,192 98,192" fill="#C4A06A" />
              <text x="320" y="268" textAnchor="middle" className="fill-thermo font-mono text-[11px]">
                BACKPROP · ∂L/∂θ RETURN BUS
              </text>

              <text x="24" y="96" className="fill-signal font-mono text-[11px]">
                EPOCH 042 · BATCH 128 · LR 3e-4 · AMP ENABLED
              </text>
              <text x="24" y="300" className="fill-mist font-mono text-[10px]">
                THROUGHPUT 412 img/s · GPU MEM 21.4 / 24 GB · DDP WORLD 8
              </text>
            </svg>
          )}

          {mode === "servo" && (
            <svg viewBox="0 0 640 320" className="h-full w-full" role="img" aria-label="Gradient descent optimiser loss landscape">
              {/* loss surface */}
              <path
                d="M0 60 C 70 60 80 150 130 150 C 175 150 185 100 230 100 C 275 100 285 210 340 210 C 400 210 410 120 470 120 C 520 120 540 250 640 250"
                fill="none"
                stroke="#7BA3C9"
                strokeOpacity="0.5"
                strokeWidth="1.8"
              />

              {/* descent path */}
              <path
                d="M40 40 C 110 70 150 130 200 128 C 260 126 290 190 360 196 C 430 202 500 230 590 236"
                fill="none"
                stroke="#C5A880"
                strokeWidth="2.4"
                strokeDasharray="5 5"
                className="animate-flow"
              />

              {/* step markers */}
              {[
                [40, 40, "θ₀"],
                [200, 128, "θ₁₀"],
                [360, 196, "θ₁₀₀"],
                [590, 236, "θ*"],
              ].map(([x, y, l], i) => (
                <g key={i}>
                  <circle cx={x as number} cy={y as number} r="5" fill="#C5A880" stroke="#0F1A2C" strokeWidth="1.5" />
                  <text x={(x as number) + 9} y={(y as number) - 8} className="fill-signal font-mono text-[11px]">
                    {l as string}
                  </text>
                </g>
              ))}

              {/* minimum */}
              <circle cx="612" cy="240" r="10" fill="none" stroke="#C5A880" strokeWidth="1.2" />
              <circle cx="612" cy="240" r="4" fill="#C5A880" />

              <text x="24" y="34" className="fill-signal font-mono text-[11px]">
                OPTIMISER: ADAMW · COSINE DECAY · WARMUP 2k
              </text>
              <text x="400" y="298" className="fill-signal font-mono text-[11px]">
                CONVERGED θ* · LOSS 0.0031
              </text>
              <text x="24" y="298" className="fill-mist font-mono text-[10px]">
                GRAD NORM 0.42 · NO SADDLE LOCK
              </text>
            </svg>
          )}
        </div>
      </div>

      {/* Readout strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-lab-panel/70 px-5 py-3">
        <span className="label-plate text-slate-lab">
          Status: <span className="text-signal-deep">Calibrated</span>
        </span>
        <span className="label-plate text-mist">
          Session {String(tick % 999).padStart(3, "0")}
        </span>
        <span className="label-plate text-graphite">Al-Fihriya Research Bench</span>
      </div>
    </div>
  );
}
