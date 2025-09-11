import useDeviceDetection from "@/context/useDeviceDetection";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import styles from "./HeroButtons.module.scss";
import Link from "next/link";

const HeroButtons = () => {
  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  return (
    <div className={styles.buttonBar}>
      <Link href="/catalog">
        <Button
          className={styles.button}
          size={getButtonSize()}
          variant="primary"
        >
          <div className={styles.iconContainer}>
            <Icon
              className={styles.ButtonIcon}
              fill="white"
              name="icon-arrow-up-right2"
              size={30}
              stroke="none"
            />
          </div>
          <span className={styles.button__text}>SHOP NOW</span>
        </Button>
      </Link>
      <Link href="/about">
        <Button size={getButtonSize()} variant="secondary">
          <div className={styles.secondСontainer}>
            <Icon
              className={styles.SecondIcon}
              fill="white"
              name="icon-arrow-up-right2"
              size={getButtonSize() === "s" ? 16 : 30}
              stroke="none"
            />
          </div>
          <span className={styles.moreInfoText}>LEARN MORE</span>
        </Button>
      </Link>
    </div>
  );
};

export default HeroButtons;
