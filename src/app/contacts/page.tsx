import FeedbackSection from "@/components/FeedbackSection/FeedbackSection";
import styles from "./ContactsPage.module.scss";

export default function ContactsPage() {
  return (
    <div className="container">
      <div className={styles.contactsContainer}>
        <div className={styles.textContainer} >
          <h1>CONTACT US</h1>
          <span>Questions? Comments? Let’s get in touch with you by filling out the email form below.</span>
        </div>
      <FeedbackSection />

      </div>

    </div>
  );
}
