import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const options = [
  { id: "student", title: "Student / learner", description: "I'm learning AI or building my foundations." },
  { id: "professional", title: "AI professional", description: "I work in AI, data science, or a related field." },
  { id: "researcher", title: "Researcher / academic", description: "I do research, publish, or teach." },
  { id: "career", title: "Career switcher / curious", description: "I'm exploring AI and finding my place." },
  { id: "other", title: "Something else", description: "My path doesn't fit one of these labels." },
];
const STORAGE_KEY = "alfihriya-community-poll-v1";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const sharedVotingEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
type PollData = { counts: Record<string, number>; myVote: string | null };
const empty: PollData = { counts: {}, myVote: null };

export default function CommunityPoll() {
  const [data, setData] = useState<PollData>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    async function loadShared() {
      if (sharedVotingEnabled) {
        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/community_votes?select=role`, {
            headers: { apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
          });
          if (!response.ok) throw new Error("Could not load shared votes");
          const rows = await response.json() as Array<{ role: string }>;
          const counts: Record<string, number> = {};
          rows.forEach(({ role }) => { counts[role] = (counts[role] || 0) + 1; });
          const myVote = localStorage.getItem(`${STORAGE_KEY}:myVote`);
          if (alive) setData({ counts, myVote });
        } catch {
          // Do not silently present local counts as community-wide statistics.
          if (alive) setData({ ...empty, myVote: localStorage.getItem(`${STORAGE_KEY}:myVote`) });
        }
      } else {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved && alive) setData({ ...empty, ...JSON.parse(saved) });
        } catch { /* Keep the poll usable if browser storage is unavailable. */ }
      }
      if (alive) setReady(true);
    }
    void loadShared();
    if (sharedVotingEnabled) {
      const timer = window.setInterval(() => { void loadShared(); }, 15000);
      return () => { alive = false; window.clearInterval(timer); };
    }
    return () => { alive = false; };
  }, []);
  const total = Object.values(data.counts).reduce((sum, n) => sum + n, 0);
  async function vote(id: string) {
    if (data.myVote || !ready) return;
    if (sharedVotingEnabled) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/community_votes`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY!, Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json", Prefer: "return=minimal",
          },
          body: JSON.stringify({ role: id }),
        });
        if (!response.ok) throw new Error("Vote could not be saved");
        localStorage.setItem(`${STORAGE_KEY}:myVote`, id);
        setData((current) => ({ ...current, myVote: id, counts: { ...current.counts, [id]: (current.counts[id] || 0) + 1 } }));
      } catch {
        window.alert("Your vote could not be saved to the shared poll. Please try again later.");
      }
      return;
    }
    const next = { counts: { ...data.counts, [id]: (data.counts[id] || 0) + 1 }, myVote: id };
    setData(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Storage may be blocked. */ }
  }
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
                  return <button key={option.id} type="button" onClick={() => vote(option.id)} disabled={!!data.myVote || !ready} className={`w-full rounded-xl border p-4 text-left transition-colors ${selected ? "border-signal-deep bg-signal/10" : "border-line bg-white hover:border-signal-deep"} disabled:cursor-default`}>
                    <span className="flex items-center justify-between gap-3"><span className="font-semibold text-carbon">{option.title}</span><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-signal-deep bg-signal-deep text-white" : "border-line"}`}>{selected ? "✓" : ""}</span></span>
                    <span className="mt-1 block text-sm leading-relaxed text-steel">{option.description}</span>
                  </button>;
                })}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-steel">{data.myVote ? "Thanks for sharing your place in the community." : sharedVotingEnabled ? "Your vote is saved to the community poll." : "Your vote is saved on this device. Votes from other visitors are not included without a shared server."}</p>
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
              <p className="mt-6 border-t border-line-dark pt-4 text-xs leading-relaxed text-mist">{sharedVotingEnabled ? "Community-wide totals refresh automatically about every 15 seconds." : "These totals are saved on this device and increase with each vote here. GitHub Pages alone cannot combine votes from different visitors."}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
