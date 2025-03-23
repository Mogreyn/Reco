import styles from "./Header.module.scss";
import "@/styles/index.scss";
import Logo from "@/components/Image/Image";
import logo1x from "@/assets/images/logo/logo-1x.png";
import logo2x from "@/assets/images/logo/logo-2x.png";
import { navigationButtons } from "@/constants/navigationButtons";
import NavButtons from "@/components/NavButtons/NavButton";
import NavBar from "../NavBar/NavBar";
import Link from "next/link";
import CallButton from "../CallButton/CallButton";
import CartButton from "../CartButton/CartButton";
import { phoneNumber } from "@/constants/contacts";
import BurgerBtn from "../BurgerBtn/BurgerBtn";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <Logo
              src1x={logo1x.src}
              src2x={logo2x.src}
              alt="Логотип компанії RECO"
              size="small"
            />
          </Link>

          <NavBar className={styles.navBar}>
            <NavButtons
              className={styles.navBarBtns}
              labels={navigationButtons.map((button) => button.title)}
              buttons={navigationButtons}
            />
          </NavBar>

          <div className={styles.active_btns}>
            <Link href={`tel:${phoneNumber}`} className={styles.call_btn}>
              <CallButton phoneNumber={phoneNumber} />
            </Link>
            <Link href="/cart" className={styles.cart_btn}>
              {/* <CartButton /> */}
            </Link>
          </div>

          <BurgerBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
