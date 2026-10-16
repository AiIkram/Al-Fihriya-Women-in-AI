import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Who can join?",
    a: "Women working or studying in any area of AI and adjacent computational science — machine learning, computer vision, robotics, NLP, medical imaging, neuroscience, theoretical ML, and AI safety. Students, researchers, engineers, faculty and industry practitioners are all welcome.",
  },
  {
    q: "Do I have to specialise in one subfield?",
    a: "No. The fellowship spans eight active modules, from foundation models to astrophysics and safety. Many members work across several, and cross-module collaboration is the point.",
  },
  {
    q: "Do I need publications or an existing role?",
    a: "No. Members range from undergraduates writing their first training loop to professors and research directors. Stage is not a filter — participation and good faith are.",
  },
  {
    q: "Is the community international?",
    a: "Yes. Members are based across Algeria, Europe, North America, the Middle East, Africa, Asia and Latin America. Sessions are online, and travel meetups happen at major conferences.",
  },
  {
    q: "Is it open to all religions and backgrounds?",
    a: "Completely. Muslim, Christian, Jewish, Hindu, secular and nonreligious women are all members and equally welcome. There is no belief, cultural or dress requirement — only mutual respect.",
  },
  {
    q: "How do I take part?",
    a: "Join through our LinkedIn group to connect with the community and find updates, discussions, and opportunities.",
  },
  {
    q: "Where do opportunities get posted?",
    a: "Calls for papers, deadline reminders, funded PhD and postdoc positions, fellowships and summer schools go into the channel in real time. Public highlights appear on LinkedIn.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-line bg-lab-panel/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2.5">
                <span className="led bg-signal-deep text-signal-deep" />
                <span className="label-plate text-graphite">Diagnostics · 07 Entries</span>
              </div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">
                Frequently asked.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.75] text-steel">
                Straight answers on eligibility, scope and how the fellowship
                operates day to day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-2.5">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`instrument-panel overflow-hidden rounded-xl ${
                      isOpen ? "border-signal" : ""
                    }`}
                  >
                    <h3>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${i}`}
                        id={`faq-btn-${i}`}
                        className="flex w-full items-start justify-between gap-5 p-5 text-left"
                      >
                        <span className="flex items-start gap-3">
                          <span className="label-plate mt-1 text-mist">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[16.5px] font-bold leading-snug text-carbon sm:text-[17.5px]">
                            {f.q}
                          </span>
                        </span>
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border transition-all ${
                            isOpen
                              ? "rotate-45 border-signal bg-signal text-carbon"
                              : "border-line bg-lab text-slate-lab"
                          }`}
                          aria-hidden
                        >
                          <Plus size={14} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="accordion-panel"
                      data-open={isOpen}
                    >
                      <div>
                        <p className="border-t border-line px-5 pb-5 pt-4 pl-[3.15rem] text-[15px] leading-[1.8] text-steel">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
