import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: 'AKBS Poultry Farming Private Limited | Integrated Poultry & Feed Manufacturing',
  description:
    'AKBS Poultry Farming Private Limited — an integrated poultry company engaged in broiler farming, feed manufacturing, poultry infrastructure and consultancy using modern scientific techniques.',
  keywords: [
    'AKBS Poultry',
    'Poultry Farming India',
    'Broiler Farming Madhya Pradesh',
    'Feed Manufacturing',
    'Environment Controlled Poultry',
    'Silwani Raisen Poultry',
  ],
  openGraph: {
    title: 'AKBS Poultry Farming Private Limited',
    description:
      'Modern integrated poultry farming, feed manufacturing and infrastructure development in Madhya Pradesh, India.',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
