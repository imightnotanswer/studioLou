interface IMNALogoProps {
  className?: string
  variant?: 'grid' | 'horizontal'
}

export function IMNALogo({ className = '', variant = 'grid' }: IMNALogoProps) {
  if (variant === 'horizontal') {
    // Horizontal layout for mobile - just letters
    return (
      <svg
        viewBox="0 0 80 40"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="10"
          y="28"
          textAnchor="middle"
          fill="#a1aa2e"
          fontSize="24"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          I
        </text>
        <text
          x="30"
          y="28"
          textAnchor="middle"
          fill="#9ab4c1"
          fontSize="24"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          M
        </text>
        <text
          x="50"
          y="28"
          textAnchor="middle"
          fill="#b72b0f"
          fontSize="24"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          N
        </text>
        <text
          x="70"
          y="28"
          textAnchor="middle"
          fill="#440a09"
          fontSize="24"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          A
        </text>
      </svg>
    )
  }

  // Grid layout for desktop - just letters, smaller and closer together
  return (
    <svg
      viewBox="0 0 50 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fill="#a1aa2e"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        I
      </text>
      <text
        x="38"
        y="25"
        textAnchor="middle"
        fill="#9ab4c1"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        M
      </text>
      <text
        x="20"
        y="45"
        textAnchor="middle"
        fill="#b72b0f"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        N
      </text>
      <text
        x="38"
        y="45"
        textAnchor="middle"
        fill="#440a09"
        fontSize="18"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        A
      </text>
    </svg>
  )
}

