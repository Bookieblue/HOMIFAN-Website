import './globals.css';
import type { Metadata } from 'next';
import QueryProvider from './providers';

export const metadata: Metadata = {
  title: 'House of Prayer Ministries',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
