import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenRelio Dashboard',
  description: 'AI inference optimization gateway - Cut your AI costs by 60%',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${inter.className} min-h-full bg-zinc-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
