"use client";
import styles from "./Header.module.scss";
import "@/styles/index.scss";
import Image from "next/image";
import { navigationButtons } from "@/constants/navigationButtons";
import NavButtons from "@/components/NavButtons/NavButton";
import NavBar from "../NavBar/NavBar";
import Link from "next/link";
import CartButton from "../CartButton/CartButton";
import { useFavorites } from "@/context/FavoritesContext";
import BurgerBtn from "../BurgerBtn/BurgerBtn";
import { useScrollHeader } from "@/hooks/useScrollHeader";

const Header = () => {
  const isHeaderVisible = useScrollHeader();
  const { favorites } = useFavorites();

  return (
    <header
      className={`${styles.header} ${!isHeaderVisible ? styles.hidden : ""}`}
    >
      <div className="container">
        <div className={styles.content}>
          <Link className={styles.logo} href="/">
            <Image
              unoptimized
              alt="Логотип компании"
              className={styles.logoImg}
              height={64}
              sizes="(max-width: 768px) 48px, 48px"
              src="/images/logo/logo.svg"
              width={64}
            />
          </Link>

          <NavBar className={styles.navBar}>
            <NavButtons
              buttons={navigationButtons}
              className={styles.navBarBtns}
              labels={navigationButtons.map((button) => button.title)}
            />
          </NavBar>

          <div className={styles.active_btns}>
            <Link aria-label="Favorites" className={styles.cart_btn} href="/favorites">
              <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <span style={{ fontSize: 22, lineHeight: 1, marginRight: 8 }}>♡</span>
                {favorites.length > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#fbc000", color: "#111", borderRadius: 9999, padding: "0 6px", fontSize: 12 }}>
                    {favorites.length}
                  </span>
                )}
              </span>
            </Link>
            <Link aria-label="Cart" className={styles.cart_btn} href="/cart">
              <CartButton cart={[]} />
            </Link>
          </div>

          <BurgerBtn aria-label="Menu" />
        </div>
      </div>
    </header>
  );
};

export default Header;
