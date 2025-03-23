import useDeviceDetection from "@/hooks/useDeviceDetection";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import styles from "./HeroButtons.module.scss";

const HeroButtons = () => {
  return (
    <div className={styles.buttonBar}>
      <Button size={`m`} variant="primary" className={styles.button}>
        <div className={styles.iconContainer}>
          <Icon
            name="icon-arrow-up-right2"
            size={30}
            fill="white"
            stroke="none"
            className={styles.ButtonIcon}
          />
        </div>
        <span className={styles.button__text}>ЗАМОВИТИ</span>
      </Button>
      <Button size={`m`} variant="secondary">
        <div className={styles.secondСontainer}>
          <Icon
            name="icon-arrow-up-right2"
            fill="white"
            stroke="none"
            className={styles.SecondIcon}
          />
        </div>
        <span className={styles.moreInfoText}>ПРО НАС</span>
      </Button>
    </div>
  );
};

export default HeroButtons;
