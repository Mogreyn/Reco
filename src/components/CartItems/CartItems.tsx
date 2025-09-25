"use client";
import type { CartItem } from "@/types/types";
import { useCart } from "@/context/CartContext";
import styles from "./CartItems.module.scss";
import Image from "next/image";

const CartItems = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, addToCart } =
    useCart();

  const handleIncreaseQuantity = (item: CartItem) => {
    addToCart(item.product, item.size || "");
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity && item.quantity > 1) {
      updateCartItemQuantity(
        item.product.id,
        item.quantity - 1,
        item.size || ""
      );
    }
  };

  const getItemPrice = (item: CartItem) => {
    return item.product.price;
  };

  return (
    <section className={styles.cartItems}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li
              key={`${item.product.id}-${item.size}`}
              className={styles.cartItem}
            >
              <div className={styles.imageContainer}>
                <Image
                  alt={item.product.name}
                  height={148}
                  src={item.product.mainImage}
                  width={148}
                />
              </div>
              <div className={styles.infoContainer}>
                  <p className={styles.title}>
                    {item.product.name}{" "}
                    <button
                      className={styles.removeItem}
                      onClick={() =>
                        removeFromCart(item.product.id, item.size || "")
                      }
                    >
                      X
                    </button>
                  </p>
                <p className={styles.description}>{item.product.description}</p>

                <div className={styles.controlContainer}>
                  <p className={styles.price}>
                    ₴ 
                    {(getItemPrice(item) * item.quantity).toLocaleString(
                      "uk-UA",
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      }
                    )}{" "}
                  </p>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      -
                    </button>
                    <p>{item.quantity || 1}</p>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CartItems;
