import React from "react";

interface HelpWorkflowIsometricProps {
  className?: string;
}

export const HelpWorkflowIsometric: React.FC<HelpWorkflowIsometricProps> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 460 360"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="base-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f7f3f6" />
        </linearGradient>
        <linearGradient id="base-left" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8dde3" />
          <stop offset="100%" stopColor="#d3c2cb" />
        </linearGradient>
        <linearGradient id="base-right" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dfd2d9" />
          <stop offset="100%" stopColor="#c5b2bd" />
        </linearGradient>
        <linearGradient id="screen-bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#802B5B" />
        </linearGradient>
        <linearGradient id="glass-cube-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#802B5B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="plum-avatar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#802B5B" />
          <stop offset="100%" stopColor="#551238" />
        </linearGradient>
        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#802B5B" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Background Soft Ambient Light */}
      <ellipse cx="230" cy="240" rx="190" ry="85" fill="#fcf2f7" filter="url(#soft-glow)" />

      {/* Main Isometric Platform Base */}
      <g filter="url(#card-shadow)">
        {/* Top Face of Platform */}
        <path
          d="M230 140 L390 220 L230 300 L70 220 Z"
          fill="url(#base-top)"
          stroke="#ebdcd5"
          strokeWidth="1.5"
        />
        {/* Left Face of Platform */}
        <path
          d="M70 220 L230 300 V330 L70 250 Z"
          fill="url(#base-left)"
        />
        {/* Right Face of Platform */}
        <path
          d="M230 300 L390 220 V250 L230 330 Z"
          fill="url(#base-right)"
        />
      </g>

      {/* Grid Lines on Platform Top */}
      <path d="M150 180 L310 260" stroke="#f1e5ec" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M190 160 L350 240" stroke="#f1e5ec" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M150 260 L310 180" stroke="#f1e5ec" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M110 240 L270 160" stroke="#f1e5ec" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Workstation Console Desk on Platform (Isometric Left Block) */}
      <g filter="url(#card-shadow)">
        {/* Console Top */}
        <path
          d="M130 190 L210 150 L250 170 L170 210 Z"
          fill="#ffffff"
          stroke="#e2d6dd"
          strokeWidth="1"
        />
        {/* Console Front-Left */}
        <path
          d="M130 190 L170 210 V235 L130 215 Z"
          fill="#e8dde3"
        />
        {/* Console Front-Right */}
        <path
          d="M170 210 L250 170 V195 L170 235 Z"
          fill="#dcd0d7"
        />
        {/* Interactive Keyboard / Touchpad insets */}
        <path
          d="M155 195 L180 182 L200 192 L175 205 Z"
          fill="#f6edf2"
          stroke="#802B5B"
          strokeWidth="0.8"
        />
      </g>

      {/* Holographic Glowing Analytics Display above Console */}
      <g transform="translate(135, 105)">
        {/* Screen back frame */}
        <rect x="0" y="0" width="62" height="48" rx="6" fill="#ffffff" stroke="#802B5B" strokeWidth="1.5" />
        <rect x="3" y="3" width="56" height="42" rx="4" fill="#191735" />

        {/* Floating Holographic Bar Charts */}
        <rect x="10" y="24" width="7" height="16" rx="2" fill="#f43f5e" />
        <rect x="21" y="16" width="7" height="24" rx="2" fill="#f59e0b" />
        <rect x="32" y="20" width="7" height="20" rx="2" fill="#10b981" />
        <rect x="43" y="10" width="7" height="30" rx="2" fill="#802B5B" />

        {/* Pulse Dot */}
        <circle cx="50" cy="8" r="2" fill="#10b981" />
      </g>

      {/* Holographic Translucent Isometric Data Cube on Platform (Right Side) */}
      <g transform="translate(250, 140)">
        {/* Outer Glass Cube */}
        <path
          d="M40 0 L80 20 L40 40 L0 20 Z"
          fill="url(#glass-cube-grad)"
          stroke="#802B5B"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          d="M0 20 L40 40 V80 L0 60 Z"
          fill="url(#glass-cube-grad)"
          stroke="#802B5B"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <path
          d="M40 40 L80 20 V60 L40 80 Z"
          fill="url(#glass-cube-grad)"
          stroke="#802B5B"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* Floating Inner Mini Core */}
        <path
          d="M40 25 L55 33 L40 41 L25 33 Z"
          fill="#802B5B"
          opacity="0.8"
        />
        <path
          d="M25 33 L40 41 V56 L25 48 Z"
          fill="#5c163e"
          opacity="0.9"
        />
        <path
          d="M40 41 L55 33 V48 L40 56 Z"
          fill="#430e2c"
          opacity="0.9"
        />
      </g>

      {/* Human Specialist Figure Working on Platform (Matching Reference Image Character) */}
      <g transform="translate(180, 185)">
        {/* Head */}
        <circle cx="20" cy="12" r="7" fill="#191735" />
        {/* Torso / Jacket (Brand Orange/Plum) */}
        <path
          d="M13 22 C13 18 27 18 27 22 L31 46 C31 48 29 50 27 50 H13 C11 50 9 48 9 46 Z"
          fill="#ea580c"
        />
        {/* Arms gesturing towards the holographic console */}
        <path
          d="M10 24 L-2 36 L6 39 L14 28 Z"
          fill="#ea580c"
        />
        <circle cx="-2" cy="37" r="3" fill="#fed7aa" />

        {/* Trousers / Legs (Dark Navy) */}
        <path d="M12 50 L8 80 H14 L18 50 Z" fill="#1e1b4b" />
        <path d="M22 50 L26 80 H20 L16 50 Z" fill="#0f172a" />
        {/* Shoes */}
        <ellipse cx="10" cy="80" rx="5" ry="2.5" fill="#191735" />
        <ellipse cx="24" cy="80" rx="5" ry="2.5" fill="#191735" />
      </g>

      {/* Floating Hologram Data Indicators */}
      <g transform="translate(85, 150)">
        <circle cx="10" cy="10" r="14" fill="#ffffff" stroke="#ebdcd5" strokeWidth="1.5" />
        <path d="M6 10 L9 13 L14 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(345, 110)">
        <rect x="0" y="0" width="60" height="22" rx="11" fill="#ffffff" stroke="#ebdcd5" strokeWidth="1.5" />
        <circle cx="12" cy="11" r="4" fill="#802B5B" />
        <text x="35" y="15" fill="#802B5B" fontSize="9" fontWeight="800" textAnchor="middle">
          SYNCED
        </text>
      </g>
    </svg>
  );
};

export default HelpWorkflowIsometric;

