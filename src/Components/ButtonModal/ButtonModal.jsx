import React, { useState } from "react";
import styles from "./ButtonModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterAndSort } from "../../redux/actions";
import { ErrorModal } from "../ErrorModal/ErrorModal";

const ButtonModal = ({ title, options, setShowModal }) => {
  const dispatch = useDispatch();
  const activeOptions = [
    ...useSelector((state) => state.sort),
    ...useSelector((state) => state.filter),
  ];

  const [showErrorModal, setErrorShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handlerCheckbox = async (option) => {
    try {
      const type = title.includes("Sort") ? "sort" : "filter";

      await dispatch(filterAndSort(option, type));
    } catch (error) {
      setErrorShowModal(true);
      setMessage(`Something went wrong, please try again.
      Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <ul className={styles.optionsList}>
          {options.map((option) => {
            return (
              <li key={option}>
                <input
                  type="checkbox"
                  checked={activeOptions.includes(option)}
                  onChange={() => {
                    handlerCheckbox(option);
                  }}
                />
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
      {showErrorModal && (
        <ErrorModal
          message={message}
          setShowModal={{ setShowModal: setErrorShowModal }}
        />
      )}
    </div>
  );
};

export { ButtonModal };
