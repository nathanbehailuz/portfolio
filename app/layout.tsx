import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nathan Behailu - Portfolio',
  description: 'Computer Science student at NYU specializing in AI/ML, Federated Learning, and Responsible AI. Research assistant at MOMA Lab.',
  keywords: ['Nathan Behailu', 'Computer Science', 'AI', 'Machine Learning', 'NYU', 'Portfolio'],
  authors: [{ name: 'Nathan Behailu' }],
  creator: 'Nathan Behailu',
  openGraph: {
    title: 'Nathan Behailu - Portfolio',
    description: 'Computer Science student at NYU specializing in AI/ML, Federated Learning, and Responsible AI.',
    type: 'website',
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