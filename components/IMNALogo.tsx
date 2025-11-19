interface IMNALogoProps {
  className?: string
  variant?: 'grid' | 'horizontal'
}

// Brand colors cycling through the letters
const brandColors = [
  '#a1aa2e', // olive
  '#9ab4c1', // blueSoft
  '#b72b0f', // orangeBurnt
  '#440a09', // brownDeep
  '#818642', // sage
  '#0b3249', // navy
  '#700303', // maroon
]

const word = 'imightnotanswer'

export function IMNALogo({ className = '', variant = 'grid' }: IMNALogoProps) {
  if (variant === 'horizontal') {
    // Horizontal layout for mobile
    const letterSpacing = 14
    const startX = 7
    const fontSize = 20

    return (
      <svg
        viewBox={`0 0 ${word.length * letterSpacing} 35`}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {word.split('').map((letter, index) => (
          <text
            key={index}
            x={startX + index * letterSpacing}
            y="26"
            textAnchor="middle"
            fill={brandColors[index % brandColors.length]}
            fontSize={fontSize}
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {letter}
          </text>
        ))}
      </svg>
    )
  }

  // Horizontal layout for desktop - smaller with proper spacing
  const letterSpacing = 10
  const startX = 6
  const fontSize = 16

  return (
    <svg
      viewBox={`0 0 ${word.length * letterSpacing} 25`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {word.split('').map((letter, index) => (
        <text
          key={index}
          x={startX + index * letterSpacing}
          y="23"
          textAnchor="middle"
          fill={brandColors[index % brandColors.length]}
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          {letter}
        </text>
      ))}
    </svg>
  )
}

