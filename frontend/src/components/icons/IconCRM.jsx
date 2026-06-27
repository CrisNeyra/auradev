export default function IconCRM({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="10" r="4" fill="#FFD400" />
      <circle cx="22" cy="10" r="4" fill="#E63329" />
      <path
        d="M4 26c0-4 3.5-7 7-7s7 3 7 7"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 26c0-3 2.5-5 6-5"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="20" y="18" width="10" height="8" rx="1.5" fill="#0A0A0A" />
      <rect x="22" y="20" width="6" height="1.5" rx="0.75" fill="#FFD400" />
      <rect x="22" y="23" width="4" height="1.5" rx="0.75" fill="#E63329" />
    </svg>
  )
}
