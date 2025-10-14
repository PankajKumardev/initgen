import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'InitGen v2.0 Documentation',
  description:
    'Professional documentation for InitGen v2.0, the project bootstrap CLI with shadcn/ui integration and enhanced Next.js templates.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'InitGen v2.0 Documentation',
    description:
      'Bootstrap modern projects with shadcn/ui, Tailwind v4, and enhanced templates. InitGen v2.0 CLI.',
    url: 'https://initgen.dev',
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
