import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
