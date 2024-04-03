import type { Metadata } from 'next'
import './globals.css'
import { createClient } from '@/prismicio'
import Header from '@/components/layout/Header/Header'
import { cn } from '@/lib/utils'
import Footer from '@/components/layout/Footer/Footer'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'dark flex min-h-screen flex-col justify-between bg-background font-sans antialiased'
        )}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
