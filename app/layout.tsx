import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlotTwist - AI-Powered Boston Property Insights',
  description: 'Generate comprehensive property reports with AI analysis, zoning information, and development opportunities for Boston real estate.',
  keywords: ['boston real estate', 'property analysis', 'zoning', 'AI insights', 'development opportunities'],
  authors: [{ name: 'PlotTwist Team' }],
  creator: 'PlotTwist',
  metadataBase: new URL('https://plottwist-frontend.vercel.app'),
  
  openGraph: {
    title: 'PlotTwist - AI-Powered Boston Property Insights',
    description: 'Generate comprehensive property reports with AI analysis, zoning information, and development opportunities.',
    url: 'https://plottwist-frontend.vercel.app',
    siteName: 'PlotTwist',
    images: [
      {
        url: '/loader.png',
        height: 630,
        alt: 'PlotTwist - Boston Property Intelligence Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'PlotTwist - AI-Powered Boston Property Insights',
    description: 'Generate comprehensive property reports with AI analysis and development opportunities.',
    images: ['/loader.png'],
    creator: '@plottwist', // Your Twitter handle
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