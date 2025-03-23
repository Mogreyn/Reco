import styles from "./CatalogPage.module.scss";
import "@/styles/index.scss";
import Video from "@/components/Video/Video";

export default function CatalogPage() {
  return (
    <main className="container">
      <div className={styles.catalogPage}>
        <h1>CATALOG</h1>
        <Video />
      </div>
    </main>
  );
}
