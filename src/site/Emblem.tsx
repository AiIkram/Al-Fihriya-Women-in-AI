/**
 * AL-FIHRIYA OFFICIAL EMBLEM — Instrumentation Variant
 * The official 8-pointed star + neural connectome, rendered in
 * signal-volt green circuitry on carbon substrate.
 */
export default function Emblem({
  size = 44,
  theme = "light",
  className = "",
  animate = false,
}: {
  size?: number;
  theme?: "light" | "dark";
  className?: string;
  animate?: boolean;
}) {
  const dark = theme === "dark";
  const star = dark ? "#C5A880" : "#9D7F57";
  const lattice = dark ? "#7BA3C9" : "#0F1A2C";
  const nodeFill = dark ? "#0F1A2C" : "#FAF8F3";
  const core = dark ? "#C5A880" : "#9D7F57";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Circuit substrate pad */}
      <rect x="4" y="4" width="192" height="192" rx="18" stroke={star} strokeWidth="1.4" strokeOpacity="0.35" />
      <rect x="14" y="14" width="172" height="172" rx="12" stroke={star} strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 4" />

      {/* 8-pointed star housing */}
      <path
        d="M100 24 L121 45 L153 45 L153 77 L176 100 L153 123 L153 155 L121 155 L100 176 L79 155 L47 155 L47 123 L24 100 L47 77 L47 45 L79 45 Z"
        stroke={star}
        strokeWidth="2.6"
        strokeLinejoin="round"
        fill="none"
      />

      {/* PCB trace terminals at star vertices */}
      <g fill={star}>
        <circle cx="100" cy="24" r="4.6" />
        <circle cx="153" cy="45" r="4.6" />
        <circle cx="176" cy="100" r="4.6" />
        <circle cx="153" cy="155" r="4.6" />
        <circle cx="100" cy="176" r="4.6" />
        <circle cx="47" cy="155" r="4.6" />
        <circle cx="24" cy="100" r="4.6" />
        <circle cx="47" cy="45" r="4.6" />
      </g>

      {/* Neural connectome lattice */}
      <g stroke={lattice} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="100,40 156,100 100,156 44,100" fill="none" />
        <polygon points="139,59 139,141 61,141 61,59" fill="none" strokeOpacity="0.75" />
        <line x1="100" y1="40" x2="100" y2="156" />
        <line x1="44" y1="100" x2="156" y2="100" />
        <line x1="61" y1="59" x2="139" y2="141" strokeOpacity="0.8" />
        <line x1="139" y1="59" x2="61" y2="141" strokeOpacity="0.8" />
        <line x1="100" y1="40" x2="61" y2="141" strokeOpacity="0.42" />
        <line x1="100" y1="40" x2="139" y2="141" strokeOpacity="0.42" />
        <line x1="100" y1="156" x2="61" y2="59" strokeOpacity="0.42" />
        <line x1="100" y1="156" x2="139" y2="59" strokeOpacity="0.42" />
        <line x1="44" y1="100" x2="139" y2="59" strokeOpacity="0.42" />
        <line x1="44" y1="100" x2="139" y2="141" strokeOpacity="0.42" />
        <line x1="156" y1="100" x2="61" y2="59" strokeOpacity="0.42" />
        <line x1="156" y1="100" x2="61" y2="141" strokeOpacity="0.42" />
        <polygon points="100,69 128,100 100,131 72,100" fill="none" strokeWidth="1.6" />
      </g>

      {/* Solder nodes */}
      <g fill={nodeFill} stroke={lattice} strokeWidth="1.6">
        <circle cx="100" cy="40" r="4" />
        <circle cx="139" cy="59" r="4" />
        <circle cx="156" cy="100" r="4" />
        <circle cx="139" cy="141" r="4" />
        <circle cx="100" cy="156" r="4" />
        <circle cx="61" cy="141" r="4" />
        <circle cx="44" cy="100" r="4" />
        <circle cx="61" cy="59" r="4" />
        <circle cx="100" cy="69" r="3.4" />
        <circle cx="128" cy="100" r="3.4" />
        <circle cx="100" cy="131" r="3.4" />
        <circle cx="72" cy="100" r="3.4" />
      </g>

      {/* Power core */}
      <circle cx="100" cy="100" r="8" fill={core} />
      <circle cx="100" cy="100" r="12" stroke={core} strokeWidth="1" fill="none" strokeOpacity="0.5" />
      {animate && <circle cx="100" cy="100" r="16" stroke={core} strokeWidth="1.2" fill="none" className="animate-ring" />}
    </svg>
  );
}

export function FullLogo({
  className = "",
  size = 40,
  theme = "light",
}: {
  className?: string;
  size?: number;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem size={size} theme={theme} />
      <div className="flex flex-col leading-none">
        <span className={`font-display text-[19px] font-bold tracking-[0.06em] ${dark ? "text-lab" : "text-carbon"}`}>
          AL-FIHRIYA
        </span>
        <span className={`mt-1 label-plate ${dark ? "text-signal" : "text-signal-deep"}`}>
          Women in AI · Lab
        </span>
      </div>
    </div>
  );
}
