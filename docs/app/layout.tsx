import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'InitGen',
  description:
    'Professional documentation for InitGen v2.0, the project bootstrap CLI with shadcn/ui setup and enhanced Next.js templates.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'InitGen',
    description:
      'Bootstrap modern projects with shadcn/ui setup, Tailwind v4 support, and enhanced templates. InitGen v2.0 CLI.',
    url: 'https://initgen.pankajk.tech',
    siteName: 'InitGen',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
