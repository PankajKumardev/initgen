import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'InitGen Documentation',
  description:
    'Professional documentation for InitGen, the project bootstrap CLI.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'InitGen Documentation',
    description: 'Bootstrap modern projects in seconds with InitGen CLI.',
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
      <body>{children}</body>
    </html>
  );
}
