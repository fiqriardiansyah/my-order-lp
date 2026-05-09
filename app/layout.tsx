import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kasigo — Aplikasi Manajemen Restoran & Kafe",
  description:
    "Kelola meja, pesanan, dapur, dan kasir dalam satu aplikasi. Pelanggan pesan lewat QR code, staff pantau real-time. Coba gratis 14 hari.",
  keywords: [
    "aplikasi restoran",
    "manajemen kafe",
    "QR order",
    "kasir restoran",
    "point of sale indonesia",
  ],
  authors: [{ name: "Kasigo" }],
  creator: "Kasigo",
  metadataBase: new URL("https://kasigo.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kasigo — Aplikasi Manajemen Restoran & Kafe",
    description:
      "Kelola meja, pesanan, dapur, dan kasir dalam satu aplikasi.",
    url: "https://kasigo.online",
    siteName: "Kasigo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kasigo Dashboard Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasigo — Aplikasi Manajemen Restoran & Kafe",
    description:
      "Kelola meja, pesanan, dapur, dan kasir dalam satu aplikasi.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kasigo",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Aplikasi manajemen restoran dan kafe dengan QR ordering.",
  url: "https://kasigo.online",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
