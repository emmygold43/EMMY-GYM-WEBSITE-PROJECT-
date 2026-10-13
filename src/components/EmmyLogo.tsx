import React from 'react';

interface EmmyLogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'drawer' | 'modal' | 'hero';
  onClick?: () => void;
}

export const EmmyLogo: React.FC<EmmyLogoProps> = ({
  className = '',
  variant = 'header',
  onClick,
}) => {
  // Proportional sizing per container
  const dimensions = {
    header: { height: 'h-10 sm:h-12', width: 'w-auto' },
    footer: { height: 'h-14 sm:h-16', width: 'w-auto' },
    drawer: { height: 'h-12', width: 'w-auto' },
    modal: { height: 'h-10', width: 'w-auto' },
    hero: { height: 'h-16 sm:h-20', width: 'w-auto' },
  }[variant];

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex items-center cursor-pointer select-none group focus:outline-none transition-transform active:scale-95 ${className}`}
      aria-label="EMMY Boxing Club Official Metallic Logo"
    >
      {/* 
        Official EMMY Boxing Club Metallic Emblem:
        Stylized metallic chiseled 'E' with dynamic crimson red boxing glove & speed slash,
        chiseled chrome 'EMMY' wordmark, and 'BOXING CLUB' flanked by red aerodynamic spears.
      */}
      <div className={`relative flex items-center justify-center bg-black rounded-lg p-1.5 sm:p-2 border border-neutral-800/90 shadow-md group-hover:border-[#D3121A]/80 group-hover:shadow-[0_0_15px_rgba(211,18,26,0.25)] transition-all duration-300`}>
        <svg
          viewBox="0 0 600 380"
          className={`${dimensions.height} ${dimensions.width} object-contain`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Chrome Bright Gradient */}
            <linearGradient id="chromeBright" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#F3F4F6" />
              <stop offset="50%" stopColor="#D1D5DB" />
              <stop offset="75%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#E5E7EB" />
            </linearGradient>

            {/* Metallic Chrome Shadow Gradient */}
            <linearGradient id="chromeShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9CA3AF" />
              <stop offset="35%" stopColor="#6B7280" />
              <stop offset="70%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>

            {/* Metallic Bevel Horizontal Gradient */}
            <linearGradient id="bevelLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#E5E7EB" />
              <stop offset="55%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>

            {/* Crimson Red Vibrant Gradient for Glove & Slash */}
            <linearGradient id="crimsonRed" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="40%" stopColor="#D3121A" />
              <stop offset="85%" stopColor="#B70E15" />
              <stop offset="100%" stopColor="#880808" />
            </linearGradient>

            {/* Glove Highlight */}
            <linearGradient id="gloveHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B72" />
              <stop offset="100%" stopColor="#D3121A" />
            </linearGradient>

            {/* Subtle glow filter for the red elements */}
            <filter id="redGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#D3121A" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* ================= 1. THE CHISELED METALLIC "E" ================= */}
          <g id="letter-E-emblem">
            {/* Top Bar of E (Light Facet) */}
            <polygon
              points="255,75 405,75 390,95 285,95 265,145 255,145"
              fill="url(#chromeBright)"
            />
            {/* Top Bar Bevel Underside */}
            <polygon
              points="285,95 390,95 375,115 280,115"
              fill="url(#chromeShadow)"
            />

            {/* Main Vertical Spine of E (Left light face) */}
            <polygon
              points="255,75 285,75 240,195 220,195"
              fill="url(#chromeBright)"
            />
            {/* Main Vertical Spine (Right shadow face) */}
            <polygon
              points="285,75 305,75 260,195 240,195"
              fill="url(#chromeShadow)"
            />

            {/* Middle Bar of E (Behind the glove) */}
            <polygon
              points="280,130 350,130 335,148 270,148"
              fill="url(#chromeBright)"
            />

            {/* Bottom Bar of E (Upper light facet) */}
            <polygon
              points="240,195 385,195 370,175 250,175"
              fill="url(#chromeBright)"
            />
            {/* Bottom Bar of E (Lower shadow facet) */}
            <polygon
              points="220,195 385,195 365,215 210,215"
              fill="url(#chromeShadow)"
            />
          </g>

          {/* ================= 2. DYNAMIC RED SPEED SLASH & BOXING GLOVE ================= */}
          <g id="red-slash-and-glove" filter="url(#redGlow)">
            {/* Aerodynamic Speed Slash cutting through the E */}
            <path
              d="M 195,215 C 220,195 250,175 310,145 L 320,152 C 265,180 230,205 195,215 Z"
              fill="url(#crimsonRed)"
            />
            <path
              d="M 195,215 C 235,185 285,155 330,135 L 340,144 C 285,170 235,200 195,215 Z"
              fill="url(#crimsonRed)"
            />

            {/* Boxing Glove Wrist Wrap / Cuff */}
            <path
              d="M 315,142 L 328,136 L 333,148 L 320,154 Z"
              fill="#990000"
            />
            <line x1="318" y1="140" x2="322" y2="152" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />
            <line x1="322" y1="138" x2="326" y2="150" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.8" />

            {/* Main Red Boxing Glove Body */}
            <path
              d="M 326,137 C 333,122 350,118 360,126 C 368,133 368,145 362,154 C 354,165 340,165 330,154 Z"
              fill="url(#crimsonRed)"
            />
            {/* Glove Knuckle Highlight Cap */}
            <path
              d="M 345,122 C 355,122 363,128 363,138 C 363,144 358,150 352,150 C 355,140 350,130 345,122 Z"
              fill="url(#gloveHighlight)"
            />
            {/* Glove Thumb Contour */}
            <path
              d="M 333,144 C 330,152 334,160 342,160 C 345,160 348,156 345,152 C 340,150 336,146 333,144 Z"
              fill="#880808"
            />
            {/* Glove Leather Stitch Highlight Line */}
            <path
              d="M 335,134 C 342,126 352,127 357,133"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>

          {/* ================= 3. METALLIC CHISELED "EMMY" WORDMARK ================= */}
          <g id="emmy-wordmark">
            {/* ---- LETTER E ---- */}
            {/* E Spine Light */}
            <polygon points="108,245 130,245 130,295 108,295" fill="url(#chromeBright)" />
            {/* E Spine Shadow */}
            <polygon points="130,245 142,245 142,295 130,295" fill="url(#chromeShadow)" />
            {/* E Top Serif & Spur */}
            <polygon points="100,245 180,245 180,256 168,256 142,256 130,256 100,256" fill="url(#bevelLight)" />
            {/* E Mid Bar */}
            <polygon points="130,266 166,266 166,275 130,275" fill="url(#chromeBright)" />
            {/* E Bottom Bar */}
            <polygon points="100,284 180,284 180,295 100,295" fill="url(#chromeShadow)" />
            {/* E Right Serif Spurs */}
            <polygon points="175,245 180,245 180,258 175,255" fill="url(#chromeBright)" />
            <polygon points="175,282 180,282 180,295 175,295" fill="url(#chromeShadow)" />

            {/* ---- LETTER M (FIRST) ---- */}
            {/* Left Stems */}
            <polygon points="196,245 214,245 204,295 188,295" fill="url(#chromeBright)" />
            {/* Center V Left Diagonal */}
            <polygon points="214,245 242,284 233,287 205,245" fill="url(#chromeShadow)" />
            {/* Center V Right Diagonal */}
            <polygon points="242,284 270,245 278,245 249,287" fill="url(#chromeBright)" />
            {/* Right Stem */}
            <polygon points="270,245 288,245 288,295 272,295" fill="url(#chromeShadow)" />
            {/* M Top Spurs & Foot Serifs */}
            <polygon points="186,245 208,245 208,250 186,250" fill="url(#chromeBright)" />
            <polygon points="276,245 298,245 298,250 276,250" fill="url(#chromeBright)" />
            <polygon points="182,290 210,290 210,295 182,295" fill="url(#chromeShadow)" />
            <polygon points="266,290 294,290 294,295 266,295" fill="url(#chromeShadow)" />

            {/* ---- LETTER M (SECOND) ---- */}
            {/* Left Stem */}
            <polygon points="314,245 332,245 322,295 306,295" fill="url(#chromeBright)" />
            {/* Center V Left */}
            <polygon points="332,245 360,284 351,287 323,245" fill="url(#chromeShadow)" />
            {/* Center V Right */}
            <polygon points="360,284 388,245 396,245 367,287" fill="url(#chromeBright)" />
            {/* Right Stem */}
            <polygon points="388,245 406,245 406,295 390,295" fill="url(#chromeShadow)" />
            {/* Top & Bottom Spurs */}
            <polygon points="304,245 326,245 326,250 304,250" fill="url(#chromeBright)" />
            <polygon points="394,245 416,245 416,250 394,250" fill="url(#chromeBright)" />
            <polygon points="300,290 328,290 328,295 300,295" fill="url(#chromeShadow)" />
            <polygon points="384,290 412,290 412,295 384,295" fill="url(#chromeShadow)" />

            {/* ---- LETTER Y ---- */}
            {/* Left Diagonal Arm */}
            <polygon points="422,245 442,245 464,272 452,274" fill="url(#chromeBright)" />
            {/* Right Diagonal Arm */}
            <polygon points="498,245 478,245 458,272 470,274" fill="url(#chromeShadow)" />
            {/* Center Vertical Tail */}
            <polygon points="454,272 466,272 466,295 454,295" fill="url(#chromeBright)" />
            <polygon points="466,272 474,272 474,295 466,295" fill="url(#chromeShadow)" />
            {/* Y Serifs */}
            <polygon points="414,245 432,245 432,250 414,250" fill="url(#chromeBright)" />
            <polygon points="488,245 506,245 506,250 488,250" fill="url(#chromeBright)" />
            <polygon points="446,290 482,290 482,295 446,295" fill="url(#chromeShadow)" />
          </g>

          {/* ================= 4. "BOXING CLUB" WITH TAPERED RED SPEARS ================= */}
          <g id="boxing-club-bar">
            {/* Left Tapered Red Spear */}
            <polygon
              points="102,323 186,321 186,325 102,323"
              fill="url(#crimsonRed)"
            />
            <polygon
              points="102,323 148,321 148,323"
              fill="#FF4D58"
            />

            {/* "B O X I N G   C L U B" Clean White Geometric Lettering */}
            <text
              x="300"
              y="327"
              fill="#FFFFFF"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize="16.5"
              fontWeight="800"
              letterSpacing="0.44em"
              textAnchor="middle"
            >
              BOXING CLUB
            </text>

            {/* Right Tapered Red Spear */}
            <polygon
              points="498,323 414,321 414,325 498,323"
              fill="url(#crimsonRed)"
            />
            <polygon
              points="498,323 452,321 452,323"
              fill="#FF4D58"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
