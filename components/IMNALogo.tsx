interface IMNALogoProps {
  className?: string
  variant?: 'grid' | 'horizontal'
}

export function IMNALogo({ className = '', variant = 'grid' }: IMNALogoProps) {
  if (variant === 'horizontal') {
    // Horizontal layout for mobile
    return (
      <svg
        viewBox="0 0 160 40"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* I circle */}
        <circle cx="20" cy="20" r="18" fill="#a1aa2e" />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fill="#f4ecd3"
          fontSize="20"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          I
        </text>

        {/* M circle */}
        <circle cx="60" cy="20" r="18" fill="#9ab4c1" />
        <text
          x="60"
          y="26"
          textAnchor="middle"
          fill="#f4ecd3"
          fontSize="20"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          M
        </text>

        {/* N circle */}
        <circle cx="100" cy="20" r="18" fill="#b72b0f" />
        <text
          x="100"
          y="26"
          textAnchor="middle"
          fill="#f4ecd3"
          fontSize="20"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          N
        </text>

        {/* A circle */}
        <circle cx="140" cy="20" r="18" fill="#440a09" />
        <text
          x="140"
          y="26"
          textAnchor="middle"
          fill="#f4ecd3"
          fontSize="20"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          A
        </text>
      </svg>
    )
  }

  // Grid layout for desktop - smaller and closer together
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* I circle - top left */}
      <circle cx="30" cy="30" r="24" fill="#a1aa2e" />
      <text
        x="30"
        y="38"
        textAnchor="middle"
        fill="#f4ecd3"
        fontSize="22"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        I
      </text>

      {/* M circle - top right */}
      <circle cx="90" cy="30" r="24" fill="#9ab4c1" />
      <text
        x="90"
        y="38"
        textAnchor="middle"
        fill="#f4ecd3"
        fontSize="22"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        M
      </text>

      {/* N circle - bottom left */}
      <circle cx="30" cy="90" r="24" fill="#b72b0f" />
      <text
        x="30"
        y="98"
        textAnchor="middle"
        fill="#f4ecd3"
        fontSize="22"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        N
      </text>

      {/* A circle - bottom right */}
      <circle cx="90" cy="90" r="24" fill="#440a09" />
      <text
        x="90"
        y="98"
        textAnchor="middle"
        fill="#f4ecd3"
        fontSize="22"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        A
      </text>
    </svg>
  )
}

