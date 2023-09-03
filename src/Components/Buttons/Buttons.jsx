import React from "react";
import styles from "./Buttons.module.css";
import { SortIcon } from "./SortIcon";
import { FilterIcon } from "./FilterIcon";

const Buttons = () => {
  return (
    <div className={styles.container}>
      <button className={`${styles.sortBtn} ${styles.button}`}>
        <SortIcon />
        Sort By:
      </button>
      <button className={`${styles.filterBtn} ${styles.button}`}>
        <FilterIcon />
        Filter By:
      </button>
    </div>
  );
};

export { Buttons };
