"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HighlightText from "@/components/HighLightText/HighLightText";
import { useCart } from "@/context/CartContext";
import styles from "./SummarySection.module.scss";
import SummaryForm from "../SummaryForm/SummaryForm";
import type { Product } from "@/types/types";
import type { OrderItem, Address, Order } from "@/services/products";
import { createOrder } from "@/services/products";

const SummarySection = () => {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Address>>({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef<any>(null);

  const getItemPrice = (item: { product: Product }) => item.product.price || 0;

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + getItemPrice(item) * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const handleContinueShopping = () => {
    router.push("/catalog");
  };

  const handleCreateOrder = async () => {
    if (loading) return;

    // Validate form
    if (formRef.current) {
      const isValid = await formRef.current.triggerValidation();
      if (!isValid) return;
    }

    // Map cart items
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    }));

    const totalAmount = cartTotal;

    // Prepare payload
    const orderPayload: Order = {
      orderNumber: Date.now().toString(),
      customerId: "guest", // or real user ID
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "card" as const,
      shippingMethod: "standard",
      items: orderItems,
      subTotal: cartTotal,
      shippingCost: 0,
      taxAmount: 0,
      discountAmount: 0,
      total: totalAmount,
      currency: "UAH",
      shippingAddress: formData as Address,
      billingAddress: formData as Address,
    };

    try {
      setLoading(true);
      const data = await createOrder(orderPayload);
      console.log("Order created:", data);

      // Clear cart after successful order
      clearCart();

      router.push("/payment/success");
    } catch (err) {
      console.error(err);
      router.push("/payment/error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.cartItems}>
      <h2 className={styles.header}>Your Order</h2>

      {cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li
              key={`${item.product.id}-${item.size || "default"}`}
              className={styles.cartItem}
            >
              <div className={styles.imageContainer}>
                <Image
                  alt={item.product.name}
                  height={150}
                  width={150}
                  src={item.product.mainImage ?? "/images/product.png"}
                />
              </div>
              <div className={styles.infoContainer}>
                <HighlightText>
                  <p className={styles.title}>{item.product.name}</p>
                </HighlightText>
                {item.product.description && (
                  <p className={styles.description}>{item.product.description}</p>
                )}
                <div className={styles.controlContainer}>
                  <p className={styles.quantity}>Quantity: {item.quantity}</p>
                  <p className={styles.price}>{getItemPrice(item)} UAH</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.summaryTotal}>
        <h3>Total</h3>
        <p>₴{cartTotal}</p>
      </div>

      <SummaryForm
        ref={formRef}
        onFormChange={(data: Partial<Address>, isValid: boolean) => setFormData(data)}
      />

      <div className={styles.buttonPlaceholder}>
        {cartTotal > 0 && (
          <button
            disabled={loading}
            className={styles.checkoutButton}
            onClick={handleCreateOrder}
          >
            {loading ? "Processing..." : "PLACE ORDER"}
          </button>
        )}

        <button
          className={styles.continueShoppingButton}
          onClick={handleContinueShopping}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </section>
  );
};

export default SummarySection;
