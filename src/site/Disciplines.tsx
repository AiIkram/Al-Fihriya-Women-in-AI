import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Eye,
  Bot,
  HeartPulse,
  Telescope,
  Waves,
  Sigma,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

export interface Discipline {
  id: string;
  code: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  accent: string;
  brief: string;
  topics: string[];
  stack: string[];
  venues: string;
}

export const DISCIPLINES: Discipline[] = [
  {
    id: "llm",
    code: "MDL-01",
    name: "Foundation Models & Reasoning",
    tagline: "LLMs · transformers · chain-of-thought",
    icon: Brain,
    accent: "#C5A880",
    brief:
      "Designing and evaluating autoregressive and state-space models: reasoning traces, retrieval augmentation, mixture-of-experts routing, and multilingual coverage for Arabic and low-resource languages.",
    topics: [
      "Autoregressive & SSM backbones",
      "Reasoning + tool use",
      "RAG & long context",
      "Evaluation harnesses",
    ],
    stack: ["PyTorch", "vLLM", "DeepSpeed", "Triton"],
    venues: "NeurIPS · ICLR · ACL · EMNLP",
  },
  {
    id: "vision",
    code: "MDL-02",
    name: "Computer Vision & Perception",
    tagline: "3D reconstruction · segmentation · generation",
    icon: Eye,
    accent: "#7BA3C9",
    brief:
      "From dense prediction to neural rendering: open-vocabulary segmentation, radiance and Gaussian fields, diffusion samplers, and self-supervised representation learning on real sensor data.",
    topics: [
      "Open-vocabulary segmentation",
      "NeRF / 3D Gaussian splatting",
      "Diffusion & flow matching",
      "Self-supervised pretraining",
    ],
    stack: ["PyTorch", "JAX", "CUDA", "COLMAP"],
    venues: "CVPR · ICCV · ECCV · 3DV",
  },
  {
    id: "robotics",
    code: "MDL-03",
    name: "Robotics & Embodied Control",
    tagline: "Reinforcement learning · manipulation · control",
    icon: Bot,
    accent: "#8B9BB4",
    brief:
      "Closing the loop between models and hardware: sim-to-real transfer, diffusion policies for dexterous manipulation, legged locomotion, and safe human-robot collaboration.",
    topics: [
      "Sim-to-real transfer",
      "Diffusion & transformer policies",
      "Legged locomotion",
      "Safe HRI & control barriers",
    ],
    stack: ["MuJoCo", "Isaac Lab", "ROS 2", "PyBullet"],
    venues: "CoRL · RSS · ICRA · IROS",
  },
  {
    id: "medical",
    code: "MDL-04",
    name: "Medical AI & Imaging Science",
    tagline: "MRI segmentation · connectomics · clinical safety",
    icon: HeartPulse,
    accent: "#6B8F7A",
    brief:
      "Volumetric analysis for clinical decision support: 3D lesion segmentation, diffusion-tensor tractography, calibrated uncertainty, and validation under multi-centre domain shift.",
    topics: [
      "3D lesion segmentation (nnU-Net)",
      "DTI tractography & connectomes",
      "Uncertainty calibration",
      "Multi-centre generalisation",
    ],
    stack: ["MONAI", "nnU-Net", "SimpleITK", "3D Slicer"],
    venues: "MICCAI · IEEE TMI · MedIA",
  },
  {
    id: "space",
    code: "MDL-05",
    name: "Astrophysics & Earth Systems",
    tagline: "Telescope surveys · planetary & climate models",
    icon: Telescope,
    accent: "#C4A06A",
    brief:
      "Physics-informed learning at planetary scale: transient detection in petabyte sky surveys, satellite Earth observation, and climate dynamics constrained by physical law.",
    topics: [
      "Transient & anomaly detection",
      "Satellite EO + GIS pipelines",
      "Physics-informed operators",
      "Atmospheric / ocean dynamics",
    ],
    stack: ["Astropy", "Xarray", "JAX", "GDAL"],
    venues: "MNRAS · AGU · NeurIPS Climate",
  },
  {
    id: "neuro",
    code: "MDL-06",
    name: "Neuroscience & Neural Interfaces",
    tagline: "Spike decoding · neuromorphic computing",
    icon: Waves,
    accent: "#A88B9A",
    brief:
      "Studying where biology and silicon meet: closed-loop motor decoding from spike trains, spiking networks, and event-driven inference on milliwatt hardware.",
    topics: [
      "Closed-loop BCI decoding",
      "Spiking neural networks",
      "Neural population manifolds",
      "Event-based inference",
    ],
    stack: ["Neo", "Lava", "Brian2", "SpyKING"],
    venues: "Nature Neuro · Cosyne · NeurIPS",
  },
  {
    id: "theory",
    code: "MDL-07",
    name: "Theory & Mathematical Foundations",
    tagline: "Generalisation · geometry · optimisation",
    icon: Sigma,
    accent: "#5B7FA6",
    brief:
      "Why learning works at all: non-Euclidean geometric inductive biases, PAC-Bayes and information-theoretic bounds, neural tangent kernels, and loss-landscape geometry.",
    topics: [
      "Geometric deep learning",
      "PAC-Bayes & information bounds",
      "NTK & feature learning",
      "Optimal transport",
    ],
    stack: ["JAX", "SymPy", "Manifold", "Geoopt"],
    venues: "COLT · ALT · JMLR · ICML",
  },
  {
    id: "safety",
    code: "MDL-08",
    name: "Safety, Interpretability & Equity",
    tagline: "Circuit analysis · fairness · governance",
    icon: ShieldCheck,
    accent: "#B85C5C",
    brief:
      "Making systems legible and accountable: mechanistic circuit analysis, bias auditing with equalized-odds style metrics, red-teaming, and governance for the Global South.",
    topics: [
      "Mechanistic interpretability",
      "Fairness & bias auditing",
      "Red-teaming & evals",
      "Data sovereignty & governance",
    ],
    stack: ["TransformerLens", "Captum", "AIF360", "SAELens"],
    venues: "FAccT · AIES · NeurIPS Alignment",
  },
];

export default function Disciplines() {
  const [activeId, setActiveId] = useState(DISCIPLINES[0].id);
  const active = DISCIPLINES.find((d) => d.id === activeId) ?? DISCIPLINES[0];
  const ActiveIcon = active.icon;

  return (
    <section id="modules" className="scroll-mt-20 relative border-t border-line bg-lab py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="led bg-signal-deep text-signal-deep" />
              <span className="label-plate text-graphite">Module Rack · 08 Installed</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
              Every discipline, one bench.
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-steel">
              Select a module to inspect its research scope, tooling stack, and the
              venues where our members publish together.
            </p>
          </div>
        </Reveal>

        {/* module selector */}
        <Reveal delay={0.08}>
          <div className="mt-9 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {DISCIPLINES.map((d) => {
              const active = d.id === activeId;
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveId(d.id)}
                  aria-pressed={active}
                  className={`group flex flex-col items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                    active
                      ? "border-carbon bg-carbon text-lab shadow-[0_6px_20px_-8px_rgba(13,15,14,0.6)]"
                      : "border-line bg-white text-steel hover:border-steel"
                  }`}
                >
                  <Icon
                    size={17}
                    style={{ color: active ? d.accent : undefined }}
                    className={active ? "" : "text-slate-lab group-hover:text-graphite"}
                  />
                  <span className="w-full">
                    <span
                      className={`label-plate block ${active ? "text-signal" : "text-mist"}`}
                    >
                      {d.code}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] font-semibold leading-tight">
                      {d.name.split(" ")[0]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* active module bay */}
        <Reveal delay={0.14}>
          <div className="instrument-panel-dark mt-5 overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-line-dark bg-carbon-soft px-5 py-2.5">
              <span className="label-plate text-signal">
                Inspecting · {active.code}
              </span>
              <div className="flex items-center gap-2">
                <span className="led animate-blink-led bg-signal text-signal" />
                <span className="label-plate text-mist">Online</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]"
              >
                {/* left */}
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-lg border"
                      style={{
                        borderColor: `${active.accent}55`,
                        background: `${active.accent}14`,
                        color: active.accent,
                      }}
                    >
                      <ActiveIcon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold leading-tight text-lab sm:text-2xl">
                        {active.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-[11px] text-mist">
                        {active.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[15.5px] leading-[1.8] text-lab/70">
                    {active.brief}
                  </p>

                  <div className="mt-6">
                    <span className="label-plate text-mist">Research topics</span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {active.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line-dark bg-carbon-soft px-2.5 py-1 font-mono text-[11px] text-lab/85"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* right */}
                <div className="lg:border-l lg:border-line-dark lg:pl-8">
                  <span className="label-plate text-mist">Toolchain</span>
                  <div className="mt-2.5 grid grid-cols-2 gap-2">
                    {active.stack.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 rounded-lg border border-line-dark bg-carbon-soft px-3 py-2"
                      >
                        <span
                          className="led shrink-0"
                          style={{ background: active.accent }}
                        />
                        <span className="truncate font-mono text-[11px] font-medium text-lab/85">
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg border border-line-dark bg-carbon-soft p-4">
                    <span className="label-plate text-mist">Publication venues</span>
                    <p className="mt-1.5 font-mono text-[11.5px] font-semibold text-signal">
                      {active.venues}
                    </p>
                  </div>

                  <p className="mt-5 border-t border-line-dark pt-4 text-[13px] leading-relaxed text-lab/55">
                    Members co-review drafts, share benchmark code, and run pre-submission
                    clinics ahead of these deadlines.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
