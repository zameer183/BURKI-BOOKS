import type { Metadata } from "next";
import { Raleway, Prata } from "next/font/google";
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
  title: {
    default: "Burki Books – Buy Books Online in Pakistan | From Classics to Curiosity",
    template: "%s | Burki Books",
  },
  description:
    "Burki Books is Pakistan's growing online bookstore. Buy new & old books on Fiction, History, Politics, Islamic Thought, Pashto Literature & more. Cash on delivery & online payment available.",
  keywords: [
    "buy books online Pakistan",
    "Burki Books",
    "online bookstore Pakistan",
    "Urdu books",
    "Pashto books",
    "Islamic books",
    "history books Pakistan",
    "fiction books Pakistan",
    "CSS books",
    "PMS preparation books",
    "cheap books Pakistan",
  ],
  authors: [{ name: "Burki Books" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Burki Books",
    title: "Burki Books – Buy Books Online in Pakistan",
    description:
      "Pakistan's growing online bookstore. Fiction, History, Politics, Islamic Thought, Pashto Literature & more. Order now with nationwide delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Burki Books – Buy Books Online in Pakistan",
    description:
      "Pakistan's growing online bookstore. Fiction, History, Politics, Islamic Thought & more.",
  },
  robots: {
    index: true,
    follow: true,
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
      <body className={`${raleway.variable} ${prata.variable} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <LayoutShell>{children}</LayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}
