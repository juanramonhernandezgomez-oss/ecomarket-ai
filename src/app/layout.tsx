import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ecomarket-ai | Tu Radar Financiero Cognitivo',
  description: 'IA que combina análisis de mercados con psicología del inversor',
  openGraph: {
    title: 'ecomarket-ai',
    description: 'Tu Radar Financiero Cognitivo',
    images: [
      {
        url: 'https://ecomarket-ai.es/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-slate-950 text-white">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
