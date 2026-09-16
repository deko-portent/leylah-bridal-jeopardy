import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://leylah-bridal-jeopardy.dekofromportent.chatgpt.site'),
  title: 'Who Knows Leylah Best? | Bridal Jeopardy',
  description: 'A playful bridal Jeopardy game celebrating Leylah and her November 6 wedding.',
  openGraph: {
    title: 'Who Knows Leylah Best?',
    description: 'Bridal Jeopardy • November 6',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Who Knows Leylah Best?',
    description: 'Bridal Jeopardy • November 6',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
