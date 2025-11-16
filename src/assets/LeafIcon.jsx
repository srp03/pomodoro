export default function LeafIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C8.5 2 5.5 4.5 4 8C2.5 11.5 3 15.5 5 18.5C7 21.5 10 22 12 22C14 22 17 21.5 19 18.5C21 15.5 21.5 11.5 20 8C18.5 4.5 15.5 2 12 2Z"
        fill="#4CAF50"
        opacity="0.8"
      />
      <path
        d="M12 4C9 4 6.5 6 5.5 9C4.5 12 5 15 6.5 17C8 19 10 19.5 12 19.5C14 19.5 16 19 17.5 17C19 15 19.5 12 18.5 9C17.5 6 15 4 12 4Z"
        fill="#C8F7DC"
      />
      <path
        d="M12 6L10 10L12 14L14 10L12 6Z"
        fill="#6B4F30"
        opacity="0.6"
      />
    </svg>
  )
}

