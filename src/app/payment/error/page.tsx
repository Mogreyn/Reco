"use client";

import { useRouter } from "next/navigation";
import styles from "./PaymentError.module.scss";

export default function PaymentError() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Error</h1>
      <p className={styles.message}>
        Unfortunately, an error occurred while processing your payment. Please try again or choose a different payment method.
      </p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => router.push("/cart")}
        >
          Return to Cart
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => router.push("/catalog")}
        >
          Return to Catalog
        </button>
      </div>
    </div>
  );
}
