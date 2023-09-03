import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ message, setShowModal }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3 className={styles.title}>Error</h3>
        <p className={styles.message}>{message}</p>
        <button
          className={styles.closeBtn}
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { Modal };
