import { Content, asText, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import Heading from '@/components/typography/Heading'
import { cn } from '@/lib/utils'

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>

/**
 * Component for "Faq" Slices.
 */
const Faq = ({ slice }: FaqProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="md"
      className="py-8 lg:pb-16"
    >
      <div className="flex justify-center">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="5xl"
                className={cn('py-4 lg:py-8 lg:text-center')}
              >
                {children}
              </Heading>
            ),
          }}
        />
      </div>
      {slice.items.length > 0 && (
        <Accordion
          type="multiple"
          className="my-6 lg:my-12 bg-secondary rounded-lg px-4"
        >
          {slice.items.map((item, index) => (
            <AccordionItem
              key={slice.id + index}
              value={asText(item.question)}
              className="border-none"
            >
              <AccordionTrigger>
                {isFilled.richText(item.question) ? (
                  <PrismicRichText
                    field={item.question}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="prose lg:prose-lg xl:prose-xl font-semibold dark:prose-invert pr-4 text-left">
                          {children}
                        </p>
                      ),
                    }}
                  />
                ) : (
                  <p>Question Missing in CMS</p>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {isFilled.richText(item.answer) ? (
                  <PrismicRichText
                    field={item.answer}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="prose lg:prose-lg my-1.5 lg:my-3 dark:prose-invert">
                          {children}
                        </p>
                      ),
                    }}
                  />
                ) : (
                  <p>Missing Answer in CMS</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Section>
  )
}

export default Faq
