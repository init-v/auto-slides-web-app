import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Slides',
  description: 'Minimal slide editor and presenter'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
