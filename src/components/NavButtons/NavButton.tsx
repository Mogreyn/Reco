import type { FC } from "react";
import Link from "next/link";
import Button from "../Button/Button";
import styles from "./NavButtons.module.scss";
import type { NavButtonsProps } from "./types/NavButton.types";

const NavButtons: FC<NavButtonsProps> = ({ buttons, className }) => {
  const combinedClass = className
    ? `${className} ${styles.navBtns}`
    : styles.navBtns;

  return (
    <div className={combinedClass} suppressHydrationWarning>
      {buttons.map(({ title, link }) => (
        <Link key={title} href={link}>
          <Button size="m" variant="transparent">
            {title}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavButtons;
