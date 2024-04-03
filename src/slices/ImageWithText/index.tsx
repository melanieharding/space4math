import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice }: ImageWithTextProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-screen-xl py-6 lg:pb-24 lg:pt-12"
    >
      <div className={cn('grid lg:grid-cols-2')}>
        <div
          className={cn(
            'rounded-lg bg-primary/80 p-4 shadow-md backdrop-blur  lg:p-8',
            {
              'order-2 -mt-4 lg:col-span-1 lg:-mb-0 lg:-ml-4':
                slice.variation === 'default',
              'order-1 -mb-4 lg:col-span-1 lg:-mb-0 lg:-mr-4':
                slice.variation === 'rightImage',
            }
          )}
        >
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading2: ({ children }) => (
                <Heading as="h2" size="3xl" className="text-white">
                  {children}
                </Heading>
              ),
              paragraph: ({ children }) => (
                <p className="prose lg:prose-lg xl:prose-xl dark:prose-invert my-3 lg:my-6">
                  {children}
                </p>
              ),
            }}
          />
        </div>
        <div
          className={cn('flex items-center lg:col-span-3', {
            'order-2 lg:col-span-1 lg:-ml-8': slice.variation === 'rightImage',
            'order-1 lg:col-span-1 lg:-mr-4': slice.variation === 'default',
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-md shadow"
            imgixParams={{
              ar: '4:3',
              fit: 'crop',
            }}
          />
        </div>
      </div>
    </Section>
  )
}

export default ImageWithText
