import styles from "./CartPage.module.scss";
import CartItems from "@/components/CartItems/CartItems";
import CartSummary from "@/components/CartSummary/CartSummary";
import HighlightText from "@/components/HighLightText/HighLightText";
import "@/styles/index.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hairexpertreco.com"),
  title: "Кошик ",
  description:
    "Перегляньте товари у вашому кошику. Безпечна оплата, швидка доставка по всій Україні.",
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "Кошик ",
    description:
      "Перегляньте товари у вашому кошику. Безпечна оплата, швидка доставка по всій Україні.",
    type: "website",
    images: [
      {
        url: "/images/cart-og.jpg",
        width: 1200,
        height: 630,
        alt: "Кошик RECO"
      }
    ]
  }
};

export default function CartPage() {
  return (
    <section className="container">
      <div className={styles.cartPage}>
        <div className={styles.headerContainer}>
          <h1 className={styles.cartHeader}>CART</h1>
        </div>
        <div className={styles.cartContainer}>
          <CartItems />
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
