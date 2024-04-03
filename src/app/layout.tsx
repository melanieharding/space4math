import type { Metadata } from 'next'
import './globals.css'
import { createClient } from '@/prismicio'
import Header from '@/components/layout/Header/Header'
import { cn } from '@/lib/utils'
import Footer from '@/components/layout/Footer/Footer'
import {
  Inter as FontSans,
  Red_Hat_Display as FontHeading,
} from 'next/font/google'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL(`https://${settings.data.domain || `example.com`}`),
    title: settings.data.site_title || "Nick's Towing",
    description:
      settings.data.site_meta_description || `Eco-friendly auto towing.`,
    openGraph: {
      images: [settings.data.site_meta_image.url || ''],
    },
  }
}

/**
 * Heading & Body fonts
 */

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'dark flex min-h-screen flex-col justify-between bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
