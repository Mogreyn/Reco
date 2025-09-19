import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Noto_Sans } from "next/font/google";
import Script from "next/script";
import "@/styles/reset.scss";
import type { Metadata, Viewport } from "next";

const notoSans = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hairexpertreco.com/"),
  title: {
    default: "RECO",
    template: "%s | RECO"
  },
  description: "RECO - Косметика майбутнього",
  icons: {
    icon: "/images/logo/logo.svg",
    shortcut: "/images/logo/logo.svg",
    apple: "/images/logo/logo.svg"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CH59DFVHN7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-585954066');
          `}
        </Script>
        <Script id="google-analytics-event" strategy="afterInteractive">
          {`
            gtag('event', 'ads_conversion___1', {
              // <event_parameters>
            });
          `}
        </Script>
      </head>
      <body className={notoSans.className}>
        <CartProvider>
          <FavoritesProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
