import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Who can join?",
    a: "Women studying or working in AI, computer science, medical imaging, and related fields are welcome. That includes students, engineers, researchers, academics, and professionals at every stage of their journey.",
  },
  {
    q: "Do I have to specialise in one subfield?",
    a: "Not at all. Our members work across different areas, from machine learning and computer vision to medical imaging and AI safety. We encourage people to learn from one another and explore work beyond their own specialism.",
  },
  {
    q: "Do I need publications or an existing role?",
    a: "No. Students, early career researchers, experienced academics, engineers, and industry professionals are all welcome. You do not need an impressive CV to take part. Curiosity, respect, and a willingness to contribute matter more.",
  },
  {
    q: "Is the community international?",
    a: "Yes. Members are based across Algeria, Europe, North America, the Middle East, Africa, Asia and Latin America. Sessions are online, and travel meetups happen at major conferences.",
  },
  {
    q: "What kind of community are you building?",
    a: "A welcoming research community for women from different countries, cultures, and backgrounds. We share a love of learning, respect one another, and make room for different perspectives while working toward common academic goals.",
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
                A few helpful answers about joining, what we do, and how to take part.
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
