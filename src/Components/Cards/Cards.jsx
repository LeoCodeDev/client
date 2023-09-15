import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { sort, filter } from "../../redux/actions";
import styles from "./Cards.module.css";
import { Options } from "../Options/Options";
import { ErrorModal } from "../ErrorModal/ErrorModal";

const Cards = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.filteredRecipes);
  const filterOptions = useSelector((state) => state.filter);
  const orderOptions = useSelector((state) => state.sort);

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
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
    setCurrentPage(1);
  }, [recipes]);

  useEffect(() => {
    try {
      filterOptions.forEach(async (option) => await dispatch(filter(option)));
      orderOptions.forEach(async (option) => await dispatch(sort(option)));
    } catch (error) {
      setErrorMessage(`Something went wrong. Error: ${error.message}`);
      setShowModal(true);
    }
  }, [orderOptions, filterOptions, dispatch]);

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.paginationContainer}>
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
        </div>
        <section className={styles.container}>
          {currentRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                recipe={recipe}
                setShowModal={setShowModal}
                setErrorMessage={setErrorMessage}
              />
            );
          })}
        </section>
        <div
          className={`${styles.paginationContainer} ${styles.paginationContainer2}`}
        >
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
        </div>
        <aside className={styles.optionsPanel}>
          <Options />
        </aside>
      </main>
      {showModal && (
        <ErrorModal message={errorMessage} setShowModal={setShowModal} />
      )}
    </>
  );
};

export { Cards };
