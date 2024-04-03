import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Quote } from 'lucide-react'

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      as="blockquote"
    >
      <div className="mx-auto my-8 flex max-w-screen-md flex-col items-center justify-center">
        <Quote width={55} height={55} />
        <PrismicRichText
          field={slice.primary.quote}
          components={{
            paragraph: ({ children }) => (
              <p className="text-2xl lg:text-3xl font-light my-3 lg:my-6">
                {children}
              </p>
            ),
          }}
        />

        <PrismicRichText
          field={slice.primary.name}
          components={{
            paragraph: ({ children }) => (
              <footer className="uppercase text-sm font-bold">
                {children}
              </footer>
            ),
          }}
        />
      </div>
    </Section>
  )
}

export default Testimonial
