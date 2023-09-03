import React from "react";
import styles from "./ButtonModal.module.css";

const ButtonModal = ({title, options, setShowModal}) => {
    //! Revisar las diets en el backend no se esta llenando el array
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
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

export { ButtonModal };
