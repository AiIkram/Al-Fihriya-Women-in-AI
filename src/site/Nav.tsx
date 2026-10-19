import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FullLogo } from "./Emblem";
import { JoinButton } from "./JoinContext";

const links = [
  { href: "#modules", label: "Modules" },
  { href: "#bench", label: "Instrument Bench" },
  { href: "#heritage", label: "Heritage" },
  { href: "#gatherings", label: "Schedule" },
  { href: "#comms", label: "Comms" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] isolate transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-lab/92 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5"
      >
        <a href="#top" aria-label="Al-Fihriya home">
          <FullLogo size={38} />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-tech label-plate text-slate-lab transition-colors hover:text-carbon"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <JoinButton className="!rounded-lg !px-5 !py-2.5 !text-[11px]">
              Join Community
            </JoinButton>
          </li>
        </ul>

        <button
          type="button"
          className="relative z-[102] grid h-11 w-11 touch-manipulation place-items-center rounded-lg border border-line bg-white text-carbon lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-primary-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-primary-menu"
            role="region"
            aria-label="Mobile navigation links"
            className="relative z-[101] max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-lab px-5 py-5 shadow-lg lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 border-b border-line/70 py-3.5 font-display text-[17px] font-semibold text-carbon"
                  >
                    <span className="led bg-signal-deep" />
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <JoinButton className="w-full justify-center !rounded-lg">
                  Join Community
                </JoinButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
