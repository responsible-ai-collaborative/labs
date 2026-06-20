import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';

// Self-hosted at build time (works with `output: export`).
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.publisher }],
  publisher: SITE.publisher,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.publisher,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
