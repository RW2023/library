import type { Metadata } from 'next'

import './globals.css'



export const metadata: Metadata = {
  title: 'The Library App',
  description: 'Library Inventory App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  )
}
