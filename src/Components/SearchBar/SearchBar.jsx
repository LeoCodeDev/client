import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [toSearch, setToSearch] = useState(null);

  const handleChange = (event) => {
    setToSearch(event.target.value);
  };
  return (
    <div className={styles.container}>
      <label htmlFor="searchBar" className={styles.searchBarLabel}>
        Search
      </label>
      <input
        type="text"
        id="searchBar"
        className={styles.searchBarInput}
        placeholder="Insert recipe name"
        onChange={handleChange}
      />
    </div>
  );
};

export { SearchBar };
