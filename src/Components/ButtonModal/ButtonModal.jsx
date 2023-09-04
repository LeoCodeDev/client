import React from "react";
import styles from "./ButtonModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterAndSort } from "../../redux/actions";

const ButtonModal = ({ title, options, setShowModal }) => {
  const dispatch = useDispatch()
  const activeOptions = useSelector(state => state.options)

  const handlerCheckbox = (option)=>{
    dispatch(filterAndSort(option))
  }

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
                    handlerCheckbox(option)
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
    </div>
  );
};

export { ButtonModal };
