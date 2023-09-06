import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { sort, filter } from "../../redux/actions";
import styles from "./Cards.module.css";
import { recipes } from "../../utils/data.js";

const Cards = () => {
  const dispatch = useDispatch();
  // const recipes = useSelector((state) => state.filteredRecipes);
  const filterOptions = useSelector((state) => state.filter);
  const orderOptions = useSelector((state) => state.sort);

  // * Paginado
  const recipesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const currentRecipes = recipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => {
    filterOptions.forEach((option) => dispatch(filter(option)));
    orderOptions.forEach((option) => dispatch(sort(option)));
  }, [orderOptions, filterOptions, dispatch]);

  return (
    <section className={styles.container}>
      <div className={styles.pagination}>
        <button onClick={prevPage}>Prev</button>
        <button onClick={() => goToPage(1)}>Reset</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <div className={styles.pages}>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      {currentRecipes.map((recipe) => {
        return <Card key={recipe.name} recipe={recipe} />;
      })}
      <div className={styles.pagination}>
        <button onClick={prevPage}>Prev</button>
        <button onClick={() => goToPage(1)}>Reset</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <div className={styles.pages}>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </section>
  );
};

export { Cards };
