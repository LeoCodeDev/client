import { useDispatch } from "react-redux";
import React from "react";
import styles from "./Options.module.css";
import { useSelector } from "react-redux";
import { filterAndSort } from "../../redux/actions";

const Options = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const filterOptions = ["api", "dbb", ...diets];
  const orderOptions = ["asc", "des", "abc", "zyx"];
  const activeOptions = [
    ...useSelector((state) => state.sort),
    ...useSelector((state) => state.filter),
  ];

  return (
    <div className={styles.container}>
      <section className={styles.sortSection}>
        <h3>Sort by:</h3>
        {orderOptions.map((option) => {
          return (
            <div key={option} className={styles.sortOption}>
              <input
                type="checkbox"
                id={option}
                checked={activeOptions.includes(option)}
                onChange={() => {
                  dispatch(filterAndSort(option, "sort"));
                }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          );
        })}
      </section>
      <section className={styles.filterSection}>
        <h3>Filter by:</h3>
        {filterOptions.map((option) => {
          return (
            <div key={option} className={styles.filterOption}>
              <input
                type="checkbox"
                id={option}
                checked={activeOptions.includes(option)}
                onChange={() => {
                  dispatch(filterAndSort(option, "filter"));
                }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export { Options };
