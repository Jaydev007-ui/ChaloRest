import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ChaloRest – Hourly Highway Rest Stops & Accommodation in India',
  description: 'Your Road. Your Journey. Your Rest. Affordable hourly shared beds and rest stops for cab drivers, truck operators, bikers, and highway travellers across India starting from ₹30/hour.',
  keywords: 'highway rest stop, hourly hotel, cab driver rest, truck driver lodge, motel India, NH 48 hotel, bed booking, roadtrip rest, ChaloRest',
  openGraph: {
    title: 'ChaloRest – Long Roads Deserve Better Rest',
    description: 'Affordable hourly rest stops starting at ₹30/hour across Indian highways.',
    images: ['/images/highway-hero.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#17191C] text-gray-100 antialiased min-h-screen flex flex-col font-sans selection:bg-highway-orange selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
