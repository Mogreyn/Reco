"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CartSummary.module.scss";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/types/types";

const CartSummary = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const [selectedDelivery, setSelectedDelivery] = useState<string>("standard");
  const [discountCode, setDiscountCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: number;
    amount: number;
  } | null>(null);

  // Delivery options with pricing
  const deliveryOptions = {
    standard: {
      name: "Standard Delivery",
      price: 0,
      description: "3-5 business days"
    },
    express: {
      name: "Express Delivery", 
      price: 150,
      description: "1-2 business days"
    }
  };

  // Available discount codes
  const availableDiscounts = {
    "WELCOME10": { percentage: 10, description: "10% discount for new customers" },
    "SAVE15": { percentage: 15, description: "15% discount on order" },
    "SUMMER20": { percentage: 20, description: "20% summer discount" },
    "FIRST5": { percentage: 5, description: "5% discount on first order" }
  };

  const getItemPrice = (item: CartItem) => {
    if (!item.size || !item.product.sizes) return 0;

    // Проверяем, является ли sizes массивом (новая структура)
    if (Array.isArray(item.product.sizes)) {
      const sizeObj = item.product.sizes.find((s) => s.size === item.size);
      return sizeObj?.price || 0;
    }
 
    // Старая структура (объект)
    return (item.product.sizes as Record<string, number>)[item.size] || 0;
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc: number, item: CartItem) => {
      const price = getItemPrice(item);
      return acc + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const deliveryCost = deliveryOptions[selectedDelivery as keyof typeof deliveryOptions].price;
  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percentage) / 100 : 0;
  const total = subtotal + deliveryCost - discountAmount;

  const handleContinueShopping = () => {
    router.push("/catalog");
  };

  const handleApplyDiscount = () => {
    const code = discountCode.toUpperCase().trim();
    if (availableDiscounts[code as keyof typeof availableDiscounts]) {
      const discount = availableDiscounts[code as keyof typeof availableDiscounts];
      setAppliedDiscount({
        code,
        percentage: discount.percentage,
        amount: (subtotal * discount.percentage) / 100
      });
      setDiscountCode("");
    } else {
      alert("Invalid discount code");
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
  };

  return (
    <section className={styles.cartSummary}>
      <div className={styles.summaryContainer}>
        <h2 className={styles.summaryHeader}>CART SUMMARY</h2>
        <div className={styles.totalPrice}>
          <p>Subtotal:</p>
          <p>₴{subtotal}</p>
        </div>

        {/* Discount Section */}
        <div className={styles.discountSection}>
          <h3 className={styles.discountHeader}>Discount Code</h3>
          {!appliedDiscount ? (
            <div className={styles.discountInput}>
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className={styles.discountCodeInput}
              />
              <button
                onClick={handleApplyDiscount}
                className={styles.applyDiscountButton}
                disabled={!discountCode.trim()}
              >
                Apply
              </button>
            </div>
          ) : (
            <div className={styles.appliedDiscount}>
              <div className={styles.discountInfo}>
                <span className={styles.discountCode}>{appliedDiscount.code}</span>
                <span className={styles.discountDescription}>
                  -{appliedDiscount.percentage}% discount
                </span>
              </div>
              <button
                onClick={handleRemoveDiscount}
                className={styles.removeDiscountButton}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className={styles.summaryDelyvery}>
          <h3 className={styles.deliveryHeader}>Delivery</h3>
          <div className={styles.deliveryOptions}>
            <div className={styles.deliveryOption}>
              <input 
                id="delivery-standard" 
                name="delivery" 
                type="radio" 
                value="standard"
                checked={selectedDelivery === "standard"}
                onChange={(e) => setSelectedDelivery(e.target.value)}
              />
              <label
                className={styles.deliveryOptionDescription}
                htmlFor="delivery-standard"
              >
                <div>
                  <div>{deliveryOptions.standard.name}</div>
                  <div className={styles.deliveryDescription}>
                    {deliveryOptions.standard.description}
                  </div>
                </div>
                <div className={styles.deliveryPrice}>
                  {deliveryOptions.standard.price === 0 ? "Free" : `₴${deliveryOptions.standard.price}`}
                </div>
              </label>
            </div>
            <div className={styles.deliveryOption}>
              <input 
                id="delivery-express" 
                name="delivery" 
                type="radio" 
                value="express"
                checked={selectedDelivery === "express"}
                onChange={(e) => setSelectedDelivery(e.target.value)}
              />
              <label
                className={styles.deliveryOptionDescription}
                htmlFor="delivery-express"
              >
                <div>
                  <div>{deliveryOptions.express.name}</div>
                  <div className={styles.deliveryDescription}>
                    {deliveryOptions.express.description}
                  </div>
                </div>
                <div className={styles.deliveryPrice}>
                  ₴{deliveryOptions.express.price}
                </div>
              </label>
            </div>
          </div>
        </div>
        {appliedDiscount && (
          <div className={styles.discountAmount}>
            <p>Discount ({appliedDiscount.code}):</p>
            <p>-₴{discountAmount.toFixed(2)}</p>
          </div>
        )}
        <div className={styles.summaryTotal}>
          <h3>Total</h3>
          <p>₴{total.toFixed(2)}</p>
        </div>
      </div>

      {cartItems.length > 0 && (
        <button
          className={styles.checkoutButton}
          onClick={() => router.push("/summary")}
        >
          PROCEED TO CHECKOUT
        </button>
      )}

      <button
        className={styles.continueShoppingButton}
        onClick={handleContinueShopping}
      >
        CONTINUE SHOPPING
      </button>
    </section>
  );
};

export default CartSummary;
