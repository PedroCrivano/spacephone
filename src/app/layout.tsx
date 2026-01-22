import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Space Phone - Assistência Técnica',
  description: 'Totem de atendimento Space Phone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
