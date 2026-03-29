/** Decorative bouquet SVG — warm pinks, roses, and stems (reference-inspired). */
export function BouquetIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id="roseMain" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(136 94) rotate(90) scale(40)">
          <stop offset="0" stopColor="#fff7fb" />
          <stop offset="0.45" stopColor="#f8b6d3" />
          <stop offset="1" stopColor="#d9538f" />
        </radialGradient>
        <radialGradient id="roseWarm" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(102 132) rotate(90) scale(34)">
          <stop offset="0" stopColor="#ffe8d2" />
          <stop offset="0.48" stopColor="#f4ad83" />
          <stop offset="1" stopColor="#d96e4f" />
        </radialGradient>
        <radialGradient id="roseCoral" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(188 126) rotate(90) scale(31)">
          <stop offset="0" stopColor="#fff2e1" />
          <stop offset="0.5" stopColor="#ffae7c" />
          <stop offset="1" stopColor="#e66731" />
        </radialGradient>
        <linearGradient id="stem" x1="120" y1="130" x2="160" y2="315" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6b9f6e" />
          <stop offset="1" stopColor="#365d3f" />
        </linearGradient>
        <linearGradient id="leaf" x1="100" y1="220" x2="188" y2="266" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#89bd87" />
          <stop offset="1" stopColor="#4c7d51" />
        </linearGradient>
      </defs>

      <ellipse cx="140" cy="286" rx="78" ry="20" fill="#000" opacity="0.08" />

      {/* stems */}
      <path
        d="M140 308c-4-52 6-94 26-143M153 312c4-48 14-104 38-142M126 309c-9-46-4-102 12-141M132 311c-1-42-2-88-15-123"
        stroke="url(#stem)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* ribbon wrap */}
      <path d="M94 258c17 10 75 16 93 3" stroke="#d77aa5" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
      <path d="M109 266c13 8 52 11 66 3" stroke="#f4b6d0" strokeWidth="6" strokeLinecap="round" opacity="0.95" />

      {/* leaves */}
      <ellipse cx="114" cy="238" rx="25" ry="10" fill="url(#leaf)" transform="rotate(-30 114 238)" />
      <ellipse cx="170" cy="246" rx="22" ry="9" fill="url(#leaf)" transform="rotate(27 170 246)" />
      <ellipse cx="130" cy="216" rx="17" ry="8" fill="#73a976" transform="rotate(-8 130 216)" />
      <ellipse cx="154" cy="214" rx="16" ry="7" fill="#6a9d6d" transform="rotate(12 154 214)" />

      {/* filler flowers */}
      <circle cx="96" cy="184" r="6" fill="#d8b5ef" />
      <circle cx="91" cy="174" r="5" fill="#c39de8" />
      <circle cx="104" cy="178" r="5" fill="#e1c7f7" />
      <circle cx="188" cy="186" r="6" fill="#d8b5ef" />
      <circle cx="194" cy="176" r="5" fill="#c39de8" />
      <circle cx="182" cy="177" r="4" fill="#ebd7fb" />

      {/* warm blooms */}
      <circle cx="104" cy="132" r="27" fill="url(#roseWarm)" />
      <circle cx="96" cy="120" r="13" fill="#ce6046" opacity="0.8" />
      <circle cx="116" cy="119" r="11" fill="#fbd3b2" opacity="0.85" />

      <circle cx="186" cy="126" r="24" fill="url(#roseCoral)" />
      <circle cx="196" cy="116" r="12" fill="#df6b37" opacity="0.78" />
      <circle cx="176" cy="114" r="10" fill="#ffd5b2" opacity="0.85" />

      {/* central layered rose */}
      <circle cx="138" cy="95" r="33" fill="url(#roseMain)" />
      <circle cx="126" cy="82" r="18" fill="#e25a98" opacity="0.92" />
      <circle cx="150" cy="80" r="17" fill="#ffd3e6" opacity="0.9" />
      <circle cx="138" cy="72" r="13" fill="#fff5fa" />
      <circle cx="156" cy="96" r="20" fill="#ef7eab" opacity="0.82" />
      <circle cx="168" cy="88" r="14" fill="#dd5d8f" opacity="0.8" />

      {/* daisy accents */}
      <circle cx="118" cy="108" r="11" fill="#f7eaa4" />
      <circle cx="108" cy="99" r="10" fill="#fffef5" />
      <circle cx="129" cy="99" r="10" fill="#fffef5" />
      <circle cx="117" cy="90" r="9" fill="#fffef5" />
      <circle cx="117" cy="106" r="6" fill="#f2cc36" />

      {/* buds */}
      <circle cx="94" cy="202" r="13" fill="#f28fbe" />
      <circle cx="188" cy="202" r="12" fill="#f3849a" />
      <circle cx="144" cy="212" r="11" fill="#f8afd0" />

      {/* paper wrap */}
      <path
        d="M78 264c20-17 37-34 51-63c8 33 9 59 6 89c-24-3-43-11-57-26z"
        fill="#f9f1e9"
        opacity="0.9"
      />
      <path
        d="M198 263c-17-15-37-34-50-62c-8 31-12 58-9 89c23-2 42-10 59-27z"
        fill="#f7efe8"
        opacity="0.88"
      />
    </svg>
  );
}
