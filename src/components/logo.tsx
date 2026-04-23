"use client";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 70"
      width={size * 1.4}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-svg"
      aria-label="CC monogram"
    >
      <path
        d="M 40 20 C 30 16, 16 20, 12 32 C 8 44, 12 56, 24 58 C 32 59, 38 54, 40 48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="logo-path logo-c1"
      />
      <path
        d="M 78 19 C 68 14, 52 19, 48 33 C 44 46, 50 57, 62 59 C 70 60, 78 55, 80 47"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="logo-path logo-c2"
      />
    </svg>
  );
}
