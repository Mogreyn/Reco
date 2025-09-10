import styles from "./Footer.module.scss";
import type { FooterProps } from "./types/Footer.types";
import Image from "next/image";
import Link from "next/link";
import AddressForm from "../AddressForm/AddressForm";
import SocialMediaHub from "../SocialMediaHub/SocialMediaHub";
import { address, phoneNumber, email } from "@/constants/contacts";
import SocialMediaLinks from "../SocialMediaLinks/SocialMediaLinks";
import FooterLinks from "../FooterLink/FooterLink";

const PAYMENT_ICON = {
  src: "/images/sections/footer/visa-mastercard.svg",
  alt: "Visa and Mastercard payment options",
  width: 100,
  height: 40
};

const Footer = ({ className }: FooterProps) => {
  const combinedClass = className
    ? `${styles.footer} ${className}`
    : styles.footer;
  return (
    <footer className={styles.footer_container}>
      <div className={combinedClass}>
        <div className={styles.footer_upper}>
          <div className={styles.textContainer}>
            <div className={styles.logo}>
              <Link className={styles.linkLogo} href="/">
                <Image
                  alt="Логотип компанії"
                  height={64}
                  sizes="(max-width: 768px) 48px, 48px"
                  src="/images/logo/logo.svg"
                  width={64}
                />
              </Link>
            </div>
            <div className={styles.addressForm}>
              <AddressForm
                address={address}
                email={email}
                phoneNumber={phoneNumber}
              />
              <div className={styles.payment_icon_container}>
                <Image
                  alt={PAYMENT_ICON.alt}
                  className={styles.payment_icon}
                  height={PAYMENT_ICON.height}
                  src={PAYMENT_ICON.src}
                  width={PAYMENT_ICON.width}
                  style={{ width: "auto" }}
                />
              </div>
            </div>
            <div className={styles.footerLinks}>
              <FooterLinks />
            </div>
            <div className={styles.socialHub}>
              <SocialMediaHub>
                <SocialMediaLinks platform={"instagram"} />
                <SocialMediaLinks platform={"telegram"} />
              </SocialMediaHub>
            </div>
          </div>
        </div>
        <div className={styles.authorRights}>
          <p>© 2025 Nina Candle. All rights reserved.</p>
          <div className={styles.policyLinks}>
            <Link href="/policy/privacy-policy">Privacy Policy</Link>
            &nbsp;|&nbsp;
            <Link href="/policy/offer">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
