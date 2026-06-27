export default function IconBullet({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="4" fill="currentColor" />
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </svg>
  )
}
