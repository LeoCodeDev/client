import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBar.module.css";
import { SearchIcon } from "../SearchIcon/SearchIcon";
import { isNumber, isString } from "../../utils/validator.js";
import { findRecipe } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const recetas = useSelector((state) => state.recipes);
  const [toSearch, setToSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setToSearch(event.target.value);
  };

  const isValid = (value) => {
    return !isNumber(value) && isString(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!toSearch && !isValid(toSearch)) {
      setError("Please insert a valid info, must be a name");
      setShowModal(true);
      return;
    }

    dispatch(findRecipe(toSearch));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label htmlFor="searchBar" className={styles.searchBarLabel}>
        Search
      </label>
      <input
        type="search"
        id="searchBar"
        className={styles.searchBarInput}
        placeholder="Insert recipe name"
        onChange={handleChange}
        autoComplete="off"
        value={toSearch}
      />
      <button type="submit" className={styles.buttonSearch}>
        <SearchIcon />
      </button>
    </form>
  );
};

export { SearchBar };
