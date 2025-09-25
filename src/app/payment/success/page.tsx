"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./PaymentSuccess.module.scss";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thank you for your order!</h1>
      <p className={styles.message}>
        Your order has been successfully paid. We have sent a confirmation to your email.
      </p>
      <button
        className={styles.button}
        onClick={() => router.push("/catalog")}
      >
        Return to Catalog
      </button>
    </div>
  );
}
