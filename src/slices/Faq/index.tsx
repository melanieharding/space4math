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
    >
      <div className="flex justify-center">
        <PrismicRichText field={slice.primary.heading} />
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
                        <p className="prose lg:prose-lg xl:prose-xl font-semibold ">
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
                        <p className="prose lg:prose-lg my-1.5 lg:my-3">
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
