"use client";

import Image from "next/image";
import type { HeroSectionProps } from "./types/HeroSection.types";
import styles from "./HeroSection.module.scss";
import HeroButtons from "../HeroButtons/HeroButtons";

const HeroSection = ({ className }: HeroSectionProps) => {
  const combinedClass = className
    ? `${styles.hero_section} ${className}`
    : styles.hero_section;

  return (
    <section className="container">
      <div className={combinedClass} data-testid="hero-section">
        <Image src="/images/sections/hero/hero.png" alt="Hero" fill className={styles.image} priority />
        <div className={styles.hero_content}>
          <div className={styles.textField}>
            <h1 className={styles.slogan}>CREATE A GOZY ATHMOSPHERE</h1>
            <p className={styles.text}>
              Discover the art of relaxation with our handcrafted candles. Each
              scent is designed to transform your environment and elevate your
              mood{" "}
            </p>
            <HeroButtons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
