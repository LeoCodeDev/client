import React from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showRecipe } from "../../redux/actions";

const Card = ({ recipe, setErrorMessage, setShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (id) => {
    try {
      await dispatch(showRecipe(id));
      navigate(`/detail/${id}`);
    } catch (error) {
      setErrorMessage(
        `Something went wrong, please try again. Error: ${error.message}`
      );
      setShowModal(true);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        handleClick(recipe.id);
      }}
    >
      <figure className={styles.image}>
        <img src={recipe.image} alt={recipe.name} />
      </figure>
      <div className={styles.dataContainer}>
        <h2 className={styles.title}>{recipe.name}</h2>
        <ul className={styles.dietsList}>
          {recipe.diets.map((diet, i) => {
            return (
              <li className={styles.dietsItem} key={`${diet}${i}`}>
                {diet}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { Card };
