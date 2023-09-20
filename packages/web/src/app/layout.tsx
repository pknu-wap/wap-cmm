import Header from '@/components/header';
import { SocketProvider } from '@/providers/socket-provider';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: 'WCMM',
  description: 'WAP Customer Management Messenger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <SocketProvider>
          <Header />
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
