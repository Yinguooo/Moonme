import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Jolly_Lodger } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const jolly = Jolly_Lodger({
  subsets: ["latin"],
  weight: "400",
});
export const metadata: Metadata = {
  title: "MOONME",
  description: "Color analysis interface",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jolly.className} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}