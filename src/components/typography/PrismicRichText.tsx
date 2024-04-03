import Heading from '@/components/typography/Heading'
import { cn } from '@/lib/utils'
import * as prismic from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps,
} from '@prismicio/react'
import Image from 'next/image'

// type RichTextSpanProps = {
//   start: number
//   end: number
//   type: string
//   data: {
//     label: string
//   }
// }

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => {
    return (
      <Heading as="h1" size="6xl">
        {children}
      </Heading>
    )
  },
  heading2: ({ children }) => {
    return (
      <Heading as="h2" size="5xl">
        {children}
      </Heading>
    )
  },
  heading3: ({ children }) => {
    return (
      <Heading as="h3" size="4xl">
        {children}
      </Heading>
    )
  },
  heading4: ({ children }) => {
    return (
      <Heading as="h4" size="3xl">
        {children}
      </Heading>
    )
  },
  heading5: ({ children }) => {
    return (
      <Heading as="h5" size="2xl">
        {children}
      </Heading>
    )
  },
  heading6: ({ children }) => {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    )
  },
  paragraph: ({ children, node }) => {
    // const labels = node.spans.filter(
    //   (span) => span.type === 'label'
    // ) as unknown as RichTextSpanProps[]
    return (
      <p
        className={cn(
          'prose mx-auto my-3 text-foreground lg:prose-lg xl:prose-xl lg:my-6',
          {}
        )}
      >
        {children}
      </p>
    )
  },
  embed: ({ node }) => {
    return (
      <div className="mx-auto max-w-screen-sm overflow-hidden rounded shadow-xl">
        <div
          className="aspect-h-9 aspect-w-16"
          dangerouslySetInnerHTML={{ __html: node.oembed.html || '' }}
        />
      </div>
    )
  },
  image: ({ node }) => {
    return (
      <div className="prose mx-auto flex justify-center">
        <Image
          src={node.url}
          width={node.dimensions.width}
          height={node.dimensions.height}
          alt={node.alt || ''}
          className="rounded-md"
          title={node.alt || ''}
        />
      </div>
    )
  },
  list: ({ children }) => {
    return (
      <ul className="prose mx-auto list-disc lg:prose-lg xl:prose-xl">
        {children}
      </ul>
    )
  },
  listItem: ({ children }) => {
    return <li className="ml-4 md:ml-6 lg:ml-8 xl:ml-10">{children}</li>
  },
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
  },
}

export const PrismicRichText = function PrismicRichText<
  LinkResolverFunction extends
    prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
>({ components, ...props }: PrismicRichTextProps<LinkResolverFunction>) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  )
}
