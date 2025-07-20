import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlotTwist',
  description: 'PlotTwist is a platform that uses AI to analyze property data and provide insights on potential development opportunities.',
  keywords: ['Boston', 'Property', 'Development', 'Opportunities', 'AI', 'Analysis'],
  authors: [{ name: 'Zig'}],
  creator: 'PlotTwist',
  publisher: 'PlotTwist',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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