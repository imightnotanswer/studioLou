import { Button } from '@/components/Button'

export default function HomePage() {
  return (
    <div className="bg-blueSoft h-full w-full flex items-center justify-center overflow-hidden">
      <div className="text-center space-y-2 md:space-y-8 w-full px-4 py-0 md:py-8">
        <h1 className="font-heading text-xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brownDeep hover:text-cream transition-colors duration-200 cursor-default uppercase leading-tight md:leading-normal">
          Greenpoint Facialist
        </h1>
        <div className="pt-0 md:pt-4">
          <Button href="https://squareup.com/appointments/book" className="text-cream text-xs md:text-base py-2 px-4 md:py-3 md:px-6">BOOK A FACIAL</Button>
        </div>
      </div>
    </div>
  )
}

