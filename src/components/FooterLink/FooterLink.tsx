import type { FooterButton } from "./types/FooterLink.types";
import React from "react";
import classNames from "classnames";
import styles from "./FooterLink.module.scss";
import Link from "next/link";

const footerButtons: FooterButton[] = [
  { title: "HOME", link: "/" },
  { title: "ABOUT", link: "/about" },
  { title: "CATALOG", link: "catalog" },
  { title: "OUR PROCESS", link: "/our-process" },
  { title: "CONTACT", link: "/contacts" }
];

const FooterLinks: React.FC = () => {
  return (
    <div className={classNames(styles.footerLinks)}>
      {footerButtons.map((button) => (
        <Link
          key={button.link}
          passHref
          aria-label={button.title}
          className={classNames(styles.footerLink)}
          href={button.link}
        >
          {button.title}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinks;
