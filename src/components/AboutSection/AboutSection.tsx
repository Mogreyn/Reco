import styles from "./AboutSection.module.scss";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="container">
      <div className={styles.aboutSection}>
        <div className={styles.content}>
          <h2 className={styles.title}>ABOUT US</h2>
          <p className={styles.text}>
            Our brand was born from a love of comfort and a desire to create
            something special with our own hands. Each candle is the result of
            careful selection of natural ingredients, thoughtful craftsmanship,
            and a creative approach that turns simple moments into rituals of
            joy.
          </p>
          <p className={styles.text}>
            We believe that scent has the power to transport us to cherished
            memories, peaceful places, or even inspire new beginnings. That’s
            why every product is created with special attention to detail: from
            the choice of natural wax and eco-friendly wicks to the perfectly
            balanced fragrance blends.
          </p>
          <div className={styles.cta}>
            <button className={styles.button}>LEARN MORE</button>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/sections/about/about.png"
            alt="About our candles"
            className={styles.image}
            width={576}
            height={454}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
