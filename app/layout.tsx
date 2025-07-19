import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlotTwist - Your Creative Storytelling Platform',
  description: 'PlotTwist is an innovative platform for creative storytelling, collaborative writing, and immersive narrative experiences. Join our community of storytellers and bring your ideas to life.',
  keywords: ['storytelling', 'creative writing', 'collaborative writing', 'narrative', 'fiction', 'plot twist', 'story platform'],
  authors: [{ name: 'PlotTwist Team' }],
  creator: 'PlotTwist',
  publisher: 'PlotTwist',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://plottwist.vercel.app'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PlotTwist - Your Creative Storytelling Platform',
    description: 'Join our community of storytellers and bring your ideas to life with PlotTwist.',
    url: 'https://plottwist.vercel.app', // Replace with your actual domain
    siteName: 'PlotTwist',
    images: [
      {
        url: '/og-image.png', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'PlotTwist - Creative Storytelling Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlotTwist - Your Creative Storytelling Platform',
    description: 'Join our community of storytellers and bring your ideas to life with PlotTwist.',
    images: ['/og-image.png'], // Same image as OpenGraph
    creator: '@plottwist', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add when you have Google Search Console
    yandex: 'your-yandex-verification-code', // Optional
    yahoo: 'your-yahoo-verification-code', // Optional
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 