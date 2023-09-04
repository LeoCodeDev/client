import React from "react";
import styles from "./ButtonModal.module.css";

const ButtonModal = ({ title, options, setShowModal }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <ul className={styles.optionsList}>
          {options.map((option) => {
            return (
              <li key={option}>
                <input type="checkbox" />
                {option[0].toUpperCase() + option.slice(1)}
              </li>
            );
          })}
        </ul>
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
