import type { Metadata } from "next";
import { Raleway, Prata } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import LayoutShell from "@/components/LayoutShell";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icon.png", type: "image/png" },
    ],
  },
  title: {
    default: "Burki Books – Buy Books Online in Pakistan | New & Used Books | Free Delivery",
    template: "%s | Burki Books",
  },
  description:
    "Burki Books is Pakistan's leading online bookstore. Buy new & used books on Fiction, History, Politics, Islamic Thought, Pashto Literature, Urdu Literature, CSS/PMS Preparation & more. Cash on delivery & online payment. 5,000+ books available with nationwide delivery.",
  keywords: [
    "buy books online Pakistan",
    "Burki Books",
    "online bookstore Pakistan",
    "Urdu books online",
    "Pashto books online",
    "Islamic books Pakistan",
    "history books Pakistan",
    "fiction books Pakistan",
    "CSS books Pakistan",
    "PMS preparation books",
    "cheap books Pakistan",
    "used books Pakistan",
    "book delivery Pakistan",
    "Lahore bookstore",
    "buy books Lahore",
    "Pakistani literature",
    "cash on delivery books",
  ],
  authors: [{ name: "Burki Books", url: "https://burkibooks.com" }],
  creator: "Burki Books",
  publisher: "Burki Books",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Burki Books",
    title: "Burki Books – Buy Books Online in Pakistan | 5,000+ Books",
    description:
      "Pakistan's growing online bookstore. Fiction, History, Politics, Islamic Thought, Pashto Literature & more. 5,000+ books with nationwide delivery. Cash on delivery available.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Burki Books – Buy Books Online in Pakistan",
    description:
      "Pakistan's growing online bookstore. 5,000+ books across Fiction, History, Politics, Islamic Thought & more. Order now!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://burkibooks.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0HMWLZFHXZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0HMWLZFHXZ');
          `}
        </Script>
      </head>
      <body className={`${raleway.variable} ${prata.variable} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <LayoutShell>{children}</LayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}
