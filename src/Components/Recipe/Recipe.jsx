import React from "react";
import { Navbar } from "../Navbar/Navbar";
import styles from "./Recipe.module.css";
import { useSelector } from "react-redux";
import { HealthyIcon } from "./HealthyIcon";
import { TimerIcon } from "./TimerIcon";

const Recipe = () => {
  const recipe = useSelector((state) => state.recipe);

  const steps = recipe?.steps?.map((step, i) => <li key={i}>{step}</li>);

  return (
    <section className={styles.detailsContainer}>
      <Navbar />
      <header className={styles.detailsHeader}>
        <figure className={styles.detailsImg}>
          <img src={recipe.image} alt={recipe.name} />
        </figure>
        <h2 className={styles.detailsTitle}>{recipe.name}</h2>
        <div className={styles.detailsHint}>
          <p className={styles.healthyWrapper}>
            <HealthyIcon className={styles.healthyIcon}/>
            <span className={styles.healthScore}>{recipe.healthScore}</span>
          </p>
          <p className={styles.timerWrapper}>
            <span className={styles.time}>{recipe.time} min</span>
            <TimerIcon className={styles.timerIcon}/>
          </p>
        </div>
      </header>
      <article className={styles.detailsInfo}>
        <p
          className={styles.detailsDescription}
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></p>
        <ol className={styles.detailsSteps}>{steps}</ol>
      </article>
    </section>
  );
};

export { Recipe };
