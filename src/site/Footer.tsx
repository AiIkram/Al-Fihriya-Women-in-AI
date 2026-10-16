import { ArrowUp, Send } from "lucide-react";
import { FullLogo } from "./Emblem";
import { TELEGRAM_URL, LINKEDIN_URL } from "../config";

const LinkedinMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452z" />
  </svg>
);

const nav = [
  { href: "#modules", label: "Modules" },
  { href: "#bench", label: "Instrument Bench" },
  { href: "#heritage", label: "Heritage" },
  { href: "#gatherings", label: "Schedule" },
  { href: "#comms", label: "Comms" },
  { href: "#principles", label: "Values" },
  { href: "#students", label: "Students" },
  { href: "#faq", label: "FAQ" },
];

const socials = [
  { icon: Send, href: TELEGRAM_URL, label: "Telegram" },
  { icon: LinkedinMark, href: LINKEDIN_URL, label: "LinkedIn" },
].filter((s) => s.href);

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line bg-lab">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr_auto]">
          <div>
            <a href="#top" aria-label="Al-Fihriya home">
              <FullLogo size={40} />
            </a>
            <p className="mt-4 max-w-sm text-[14.5px] leading-[1.75] text-steel">
              A welcoming international community for women in AI, computer science, and medical imaging. We share knowledge, support one another, and work toward better research together.
            </p>

            {socials.length > 0 && (
              <div className="mt-5 flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white text-slate-lab transition-colors hover:border-signal hover:text-signal-deep"
                  >
                    <s.icon width={16} height={16} />
                  </a>
                ))}
              </div>
            )}

          </div>

          <nav aria-label="Footer">
            <h2 className="label-plate text-graphite">Site index</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-tech label-plate text-slate-lab transition-colors hover:text-carbon"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <button
              onClick={toTop}
              className="group inline-flex items-center gap-2.5 rounded-lg border border-line bg-white px-5 py-3 font-mono text-[12px] font-semibold text-carbon transition-colors hover:border-signal hover:text-signal-deep"
            >
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
              Return to top
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="font-mono text-[11px] text-mist">
            © {new Date().getFullYear()} Al-Fihriya Women in AI
          </p>
          <p className="font-mono text-[11px] text-mist">
            After Fatima al-Fihri · al-Qarawiyyin · 859 AD
          </p>
        </div>
      </div>
    </footer>
  );
}
