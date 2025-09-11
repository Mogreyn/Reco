import classNames from "classnames";
import type { FeaturesSectionProps } from "./types/FeaturesSection.types";
import Image from "next/image";
import styles from "./FeaturesSection.module.scss";
import BackgroundCircles from "../BackgroundCircles/BackgroundCircles";

const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  const classes = classNames(styles.featuresSection, className);

  return (
    <section className="container" data-testid="features-section">
      <h1>OUR BENEFITS</h1>
      <div className={classes}>
        <BackgroundCircles className={styles.backgroundCircles} />

        <div className={styles.featuresLeftSide}>
          <article className={styles.featuresArticleLeft}>
            <p className={styles.featuresArticleLeftText}>
              From cozy nights to special gatherings, our candles create an
              inviting atmosphere while adding a timeless, handcrafted touch to
              your space.
            </p>
          </article>

          {/* <a href="/about">Про нас</a> */}
        </div>

        <div className={styles.featuresImgContainer}>
          <div className={styles.imageWrapper}>
            <Image
              fill
              alt="recoil"
              src="/images/sections/features/feature.png"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className={styles.featuresRightSide}>
          <article className={styles.featuresArticleRightTop}>
            <p className={styles.featuresArticleRightTopText}>
              Designed for hours of enjoyment, each candle provides a steady,
              even burn that lets you savor the warm glow and aroma longer.
            </p>
          </article>

          <article className={styles.featuresArticleRightBottom}>
            <p className={styles.featuresArticleRightBottomText}>
              Our candles are crafted from natural, eco-friendly waxes that burn
              cleanly without releasing harmful toxins. Safer for your home,
              healthier for the air you breathe.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
