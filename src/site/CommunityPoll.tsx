import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const options = [
  { id: "student", title: "Student / learner", description: "I'm learning AI or building my foundations." },
  { id: "professional", title: "AI professional", description: "I work in AI, data science, or a related field." },
  { id: "researcher", title: "Researcher / academic", description: "I do research, publish, or teach." },
  { id: "career", title: "Career switcher / curious", description: "I'm exploring AI and finding my place." },
  { id: "other", title: "Something else", description: "My path doesn't fit one of these labels." },
];
const STORAGE_KEY = "alfihriya-community-poll-v2";
// Shared counter service (free, no account, no database of your own).
// Change NAMESPACE to something unique to your project.
const COUNTER_API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "alfihriya-women-in-ai-poll";
const REFRESH_MS = 15000;

type PollData = { counts: Record<string, number>; myVote: string | null };
type Status = "loading" | "live" | "offline";

/** Parse public/votes.csv -> { role: count }. Used as the starting numbers. */
function parseCsv(text: string): Record<string, number> {
  const out: Record<string, number> = {};
  text.split(/\r?\n/).slice(1).forEach((line) => {
    const [role, count] = line.split(",").map((v) => v.trim());
    if (role && !Number.isNaN(Number(count))) out[role] = Number(count);
  });
  return out;
}

async function fetchBaseline(): Promise<Record<string, number>> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}votes.csv`, { cache: "no-store" });
    if (!res.ok) return {};
    return parseCsv(await res.text());
  } catch { return {}; }
}

async function fetchLive(id: string): Promise<number> {
  const res = await fetch(`${COUNTER_API}/get/${NAMESPACE}/${id}`);
  if (res.status === 404) return 0; // nobody has voted for this option yet
  if (!res.ok) throw new Error("counter unavailable");
  const json = (await res.json()) as { value?: number };
  return Number(json.value) || 0;
}

async function hitLive(id: string): Promise<number> {
  const res = await fetch(`${COUNTER_API}/hit/${NAMESPACE}/${id}`);
  if (!res.ok) throw new Error("vote failed");
  const json = (await res.json()) as { value?: number };
  return Number(json.value) || 0;
}

export default function CommunityPoll() {
  const [data, setData] = useState<PollData>({ counts: {}, myVote: null });
  const [status, setStatus] = useState<Status>("loading");
  const [busy, setBusy] = useState(false);
  const [baseline, setBaseline] = useState<Record<string, number>>({});

  useEffect(() => {
    let alive = true;
    const myVote = (() => { try { return localStorage.getItem(`${STORAGE_KEY}:myVote`); } catch { return null; } })();
    async function load() {
      try {
        const base = await fetchBaseline();
        const live = await Promise.all(options.map((o) => fetchLive(o.id)));
        if (!alive) return;
        const counts: Record<string, number> = {};
        options.forEach((o, i) => { counts[o.id] = (base[o.id] || 0) + live[i]; });
        setBaseline(base);
        setData((cur) => ({ counts, myVote: cur.myVote ?? myVote }));
        setStatus("live");
      } catch {
        if (!alive) return;
        // Service unreachable: show the CSV numbers, never fake "community" totals.
        const base = await fetchBaseline();
        setBaseline(base);
        setData((cur) => ({ counts: base, myVote: cur.myVote ?? myVote }));
        setStatus("offline");
      }
    }
    void load();
    const timer = window.setInterval(() => { void load(); }, REFRESH_MS);
    return () => { alive = false; window.clearInterval(timer); };
  }, []);

  const total = options.reduce((sum, o) => sum + (data.counts[o.id] || 0), 0);

  async function vote(id: string) {
    if (data.myVote || busy || status !== "live") return;
    setBusy(true);
    // Optimistic update so the bar moves instantly.
    setData((cur) => ({ myVote: id, counts: { ...cur.counts, [id]: (cur.counts[id] || 0) + 1 } }));
    try {
      const live = await hitLive(id);
      setData((cur) => ({ ...cur, counts: { ...cur.counts, [id]: (baseline[id] || 0) + live } }));
      try { localStorage.setItem(`${STORAGE_KEY}:myVote`, id); } catch { /* storage blocked */ }
    } catch {
      setData((cur) => ({ myVote: null, counts: { ...cur.counts, [id]: Math.max(0, (cur.counts[id] || 1) - 1) } }));
      window.alert("Your vote could not be saved. Please try again in a moment.");
    } finally { setBusy(false); }
  }

  function downloadCsv() {
    const rows = ["role,count", ...options.map((o) => `${o.id},${data.counts[o.id] || 0}`)];
    const blob = new Blob([rows.join("\n") + "\n"], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "votes.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  const ready = status === "live";

  return (
    <section id="bench" className="scroll-mt-20 border-t border-line bg-lab-panel/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5"><span className="led bg-signal-deep text-signal-deep" /><span className="label-plate text-graphite">Community pulse · Your place in AI</span></div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-carbon sm:text-5xl">What brings you here?</h2>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-steel">Al-Fihriya brings together people at different stages of their AI journey. Tell us which best describes you, and see how this community is taking shape.</p>
          </div>
        </Reveal>
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-lab p-5 sm:p-7">
              <p className="label-plate text-graphite">Choose one</p>
              <div className="mt-4 space-y-3">
                {options.map((option) => {
                  const selected = data.myVote === option.id;
                  return <button key={option.id} type="button" onClick={() => vote(option.id)} disabled={!!data.myVote || !ready || busy} className={`w-full rounded-xl border p-4 text-left transition-colors ${selected ? "border-signal-deep bg-signal/10" : "border-line bg-white hover:border-signal-deep"} disabled:cursor-default`}>
                    <span className="flex items-center justify-between gap-3"><span className="font-semibold text-carbon">{option.title}</span><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-signal-deep bg-signal-deep text-white" : "border-line"}`}>{selected ? "✓" : ""}</span></span>
                    <span className="mt-1 block text-sm leading-relaxed text-steel">{option.description}</span>
                  </button>;
                })}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-steel">{data.myVote ? "Thanks for sharing your place in the community." : status === "offline" ? "Voting is temporarily unavailable. Please try again later." : "Click an option to add your voice — everyone sees the update."}</p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="instrument-panel-dark h-full rounded-2xl p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-line-dark pb-4"><div><p className="label-plate text-signal">Community statistics</p><h3 className="mt-2 font-display text-2xl font-bold text-lab">Who’s in the room?</h3></div><div className="text-right"><div className="font-mono text-3xl font-bold text-signal">{total}</div><div className="label-plate text-mist">{total === 1 ? "response" : "responses"}</div></div></div>
              <div className="mt-5 space-y-5">
                {options.map((option) => {
                  const count = data.counts[option.id] || 0;
                  const pct = total ? Math.round(count / total * 100) : 0;
                  return <div key={option.id}><div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="text-lab">{option.title}</span><span className="font-mono text-signal">{pct}% <span className="text-mist">({count})</span></span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-signal transition-all duration-500" style={{ width: `${pct}%` }} /></div></div>;
                })}
              </div>
              <p className="mt-6 border-t border-line-dark pt-4 text-xs leading-relaxed text-mist">{status === "live" ? "Community-wide totals refresh automatically about every 15 seconds." : status === "loading" ? "Loading community totals…" : "Live totals are unavailable right now; showing the last saved numbers."}</p>
              <button type="button" onClick={downloadCsv} className="mt-3 font-mono text-[11px] uppercase tracking-wider text-signal underline-offset-4 hover:underline">Download results (CSV)</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
