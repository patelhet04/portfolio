type IconProps = { className?: string };

const base = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowOut = ({ className = "arr arr--out" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
);

export const ArrowDown = ({ className = "arr arr--down" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
);

export const ArrowBack = ({ className = "arr arr--back" }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M13 8H3M7 4 3 8l4 4" />
  </svg>
);

export const ArrowUp = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={1.8} className={className}>
    <path d="M8 13V3M4 7l4-4 4 4" />
  </svg>
);

export const Check = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={1.8} className={className}>
    <path d="m3.5 8.5 3 3 6-7" />
  </svg>
);

export const Regenerate = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3" />
  </svg>
);

export const Moon = ({ className = "moon" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

export const Sun = ({ className = "sun" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
);

export const Menu = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M2.5 5.5h11M2.5 10.5h11" />
  </svg>
);

export const Close = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);
