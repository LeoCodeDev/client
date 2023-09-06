import React from "react";
import styles from "./Card.module.css";

const Card = ({ recipe }) => {
  let i = 0;
  return (
    <div className={styles.card}>
      <figure className={styles.image}>
        <img src={recipe.image} alt={recipe.name} />
      </figure>
      <div className={styles.dataContainer}>
        <h2 className={styles.title}>{recipe.name}</h2>
        <ul className={styles.dietsList}>
          {recipe.diets.map((diet) => {
            return (
              <li className={styles.dietsItem} key={`${diet}${++i}`}>
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
