import type { Metadata } from 'next';

import './globals.css';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

export const metadata: Metadata = {
  title: 'The Library App',
  description: 'Library Inventory App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="business">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
  <Footer />
    </html>
  );
}
