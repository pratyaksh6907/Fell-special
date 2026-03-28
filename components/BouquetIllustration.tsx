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
      {/* stems */}
      <path
        d="M138 310c-2-40 8-95 22-130M152 312c4-45 18-100 35-128M124 308c-8-38-2-90 12-125"
        stroke="#4a7c59"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M140 200c-6 35-10 75-8 115"
        stroke="#5a9367"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* leaves */}
      <ellipse cx="118" cy="248" rx="18" ry="8" fill="#6b9f6e" transform="rotate(-25 118 248)" />
      <ellipse cx="168" cy="252" rx="18" ry="8" fill="#5d8f5f" transform="rotate(22 168 252)" />
      <ellipse cx="132" cy="218" rx="14" ry="6" fill="#7cb87e" transform="rotate(-8 132 218)" />
      {/* lavender sprigs */}
      <circle cx="98" cy="175" r="6" fill="#c9a7e8" />
      <circle cx="92" cy="165" r="5" fill="#b895e0" />
      <circle cx="104" cy="168" r="5" fill="#d4b8f0" />
      <circle cx="188" cy="178" r="6" fill="#c9a7e8" />
      <circle cx="194" cy="168" r="5" fill="#b895e0" />
      {/* orange blooms */}
      <circle cx="108" cy="130" r="22" fill="#f4a261" />
      <circle cx="98" cy="118" r="12" fill="#e76f51" opacity="0.85" />
      <circle cx="118" cy="118" r="10" fill="#f4c095" />
      <circle cx="185" cy="125" r="20" fill="#fb923c" />
      <circle cx="195" cy="115" r="11" fill="#ea580c" opacity="0.75" />
      {/* pink / rose layers */}
      <circle cx="138" cy="95" r="28" fill="#f9a8d4" />
      <circle cx="128" cy="82" r="18" fill="#ec4899" opacity="0.9" />
      <circle cx="150" cy="78" r="16" fill="#fbcfe8" />
      <circle cx="138" cy="72" r="12" fill="#fce7f3" />
      <circle cx="155" cy="95" r="22" fill="#fda4af" />
      <circle cx="168" cy="88" r="14" fill="#fb7185" />
      {/* white daisy */}
      <circle cx="118" cy="108" r="10" fill="#fef9c3" />
      <circle cx="108" cy="100" r="9" fill="#fffef0" />
      <circle cx="128" cy="100" r="9" fill="#fffef0" />
      <circle cx="118" cy="92" r="8" fill="#fffef0" />
      <circle cx="118" cy="105" r="6" fill="#fde047" />
      {/* small pink buds */}
      <circle cx="95" cy="195" r="14" fill="#f472b6" />
      <circle cx="188" cy="200" r="13" fill="#fb7185" />
      <circle cx="145" cy="210" r="12" fill="#f9a8d4" />
      {/* depth shadow on bouquet mass */}
      <ellipse cx="140" cy="200" rx="55" ry="25" fill="#000" opacity="0.06" />
    </svg>
  );
}
