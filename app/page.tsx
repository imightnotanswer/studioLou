import { Button } from '@/components/Button'

export default function HomePage() {
  return (
    <div className="bg-blueSoft h-full w-full flex items-center justify-center">
      <div className="text-center space-y-1 md:space-y-8 w-full px-4 py-1 md:py-8">
        <h1 className="font-heading text-lg md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brownDeep hover:text-cream transition-colors duration-200 cursor-default uppercase leading-tight md:leading-normal">
          Greenpoint Facialist
        </h1>
        <div className="pt-2 md:pt-4">
          <Button href="https://squareup.com/appointments/book" className="text-cream text-xs md:text-base py-1.5 px-3 md:py-3 md:px-6">BOOK A FACIAL</Button>
        </div>
      </div>
    </div>
  )
}

