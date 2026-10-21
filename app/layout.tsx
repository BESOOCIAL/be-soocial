import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'BE SOOCIAL - Creative Media & Production Agency',
  description: 'Premier creative media & production agency website featuring cinematic 3D experiences, full services showcase, case study portfolio, interactive project builder, and client management.',
  openGraph: {
    title: 'BE SOOCIAL - Creative Media & Production Agency',
    description: 'Premier creative media & production agency website featuring cinematic 3D experiences, full services showcase, case study portfolio, interactive project builder, and client management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BE SOOCIAL - Creative Media & Production Agency',
    description: 'Premier creative media & production agency website featuring cinematic 3D experiences, full services showcase, case study portfolio, interactive project builder, and client management.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
