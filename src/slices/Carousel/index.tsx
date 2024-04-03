'use client'
import Section from '@/components/layout/Section'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import {
  Carousel as UiCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import { PrismicNextImage } from '@prismicio/next'
/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary"
    >
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center rounded-lg py-4 lg:py-8">
        <div className="mb-4 lg:mb-8">
          {isFilled.keyText(slice.primary.title) && (
            <p className="text-sm font-medium uppercase">
              {slice.primary.title}
            </p>
          )}
        </div>
        <UiCarousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full max-w-[240px] md:max-w-screen-sm lg:max-w-screen-md"
        >
          <CarouselContent>
            {slice.items.length > 0 && (
              <>
                {slice.items.map((item, index) => {
                  return (
                    <CarouselItem
                      key={slice.id + index}
                      className="md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="p-1">
                        <Card>
                          <CardContent className="aspect-square flex flex-col items-center justify-center p-6 relative">
                            <PrismicNextImage
                              field={item.image}
                              imgixParams={{ ar: '1:1', fit: 'crop' }}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </UiCarousel>
      </div>
    </Section>
  )
}

export default Carousel
