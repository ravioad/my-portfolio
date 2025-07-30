import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CursorShadow from "@/components/CursorShadow";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Use CSS variables for Tailwind
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk', // Use CSS variables for Tailwind
  weight: ['500', '700'], // Specify weights used
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Ravi kumar - Portfolio",
  description: "Ravi kumar - Portfolio",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#00fff7' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body>
        <CursorShadow />
        {children}
      </body>
    </html>
  );
}
