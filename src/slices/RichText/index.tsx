import { PrismicRichText } from '@/components/typography/PrismicRichText'
import Section from '@/components/layout/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { cn } from '@/lib/utils'

/**
 * Props for `RichText`.
 */
export type RichTextProps = SliceComponentProps<Content.RichTextSlice>

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="md"
      className={cn('py-6 md:py-8 lg:py-12', {
        'bg-secondary': slice.variation === 'secondary',
      })}
    >
      <PrismicRichText field={slice.primary.rich_text} />
    </Section>
  )
}

export default RichText
