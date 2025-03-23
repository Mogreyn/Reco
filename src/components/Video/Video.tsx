import React from "react";
import styles from "./Video.module.scss";

const VideoBackground: React.FC = () => {
  return (
    <div className={styles.videoWrapper}>
      <video autoPlay loop muted playsInline className={styles.videoBackground}>
        <source src="/video/compressed_video.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      {/* Добавь контент сверху видео */}
      <div className={styles.bannerContent}>
        <h1>RECO</h1>
      </div>
    </div>
  );
};

export default VideoBackground;
