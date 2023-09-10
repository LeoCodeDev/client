import React, { useState } from "react";
import styles from "./Buttons.module.css";
import { SortIcon } from "./SortIcon";
import { FilterIcon } from "./FilterIcon";
import { useSelector } from "react-redux";
import { ButtonModal } from "../ButtonModal/ButtonModal";

const Buttons = () => {
  const diets = useSelector((state) => state.diets);
  const filterOptions = ["api", "dbb", ...diets];
  // const orderOptions = ["Healthy", "Less Healthy", "A-Z", "Z-A"];
  const orderOptions = ["asc", "des", "abc", "zyx"];
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  let setShowModal, title;
  let options = [];

  if (showFilter) {
    setShowModal = setShowFilter;
    options = [...filterOptions];
    title = "Filter By:";
  } else if (showSort) {
    setShowModal = setShowSort;
    options = [...orderOptions];
    title = "Sort by:";
  }

  const handlerClick = (event) => {
    const isSort = event.target.textContent.includes("Sort");
    if (isSort) {
      return setShowSort(!showSort);
    }
    return setShowFilter(!showFilter);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handlerClick}
        className={`${styles.sortBtn} ${styles.button}`}
      >
        <SortIcon />
        Sort By:
      </button>
      <button
        onClick={handlerClick}
        className={`${styles.filterBtn} ${styles.button}`}
      >
        <FilterIcon />
        Filter By:
      </button>
      {(showFilter || showSort) && (
        <ButtonModal
          title={title}
          setShowModal={setShowModal}
          options={options}
        />
      )}
    </div>
  );
};

export { Buttons };
