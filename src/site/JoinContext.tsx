import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { COMMUNITY_JOIN_URL } from "../config";
import Emblem from "./Emblem";

const JoinCtx = createContext<() => void>(() => {});

export function JoinProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const openDialog = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <JoinCtx.Provider value={openDialog}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-carbon/80 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="join-title"
              className="instrument-panel relative w-full max-w-md rounded-2xl p-8"
              initial={{ opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                aria-label="Close dialog"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-line text-slate-lab transition-colors hover:bg-lab-panel hover:text-carbon"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-3">
                <Emblem size={40} animate />
                <div>
                  <div className="label-plate text-signal-deep">Access Control</div>
                  <div className="font-mono text-[11px] text-mist">UNIT W_AI-01</div>
                </div>
              </div>

              <h2 id="join-title" className="mt-5 font-display text-2xl font-bold leading-tight text-carbon">
                Community access is available on LinkedIn.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-steel">
                Join the LinkedIn group to connect with members, follow discussions, and find
                research opportunities.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-line pt-5">
                <button
                  onClick={() => setOpen(false)}
                  className="btn-lab rounded-lg px-6 py-2.5 text-[12px]"
                >
                  Acknowledge
                </button>
                <span className="label-plate text-mist">No data submitted</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </JoinCtx.Provider>
  );
}

export function JoinButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const openDialog = useContext(JoinCtx);

  const base = `btn-lab group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[12.5px] ${className}`;
  const arrow = (
    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
  );

  if (COMMUNITY_JOIN_URL) {
    return (
      <a href={COMMUNITY_JOIN_URL} target="_blank" rel="noreferrer" className={base}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <button type="button" onClick={openDialog} className={base}>
      {children}
      {arrow}
    </button>
  );
}
