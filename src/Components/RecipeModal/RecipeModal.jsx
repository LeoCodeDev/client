import React from "react";
import styles from "./RecipeModal.module.css";

const RecipeModal = ({ inputs, setShowRecipeModal, handleSubmit }) => {
  const { name, image, summary, diets, healthScore, steps, time } = inputs;
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h3 className={styles.title}>Is this your Recipe?</h3>
        <div className={styles.message}>
          <img src={image} alt={name} />
          <h4 className={styles.name}>Title: {name}</h4>
          <p className={styles.summary}>
            <span>Summary:</span> {summary}
          </p>
          <p className={styles.healthScore}>
            <span>Health Score:</span> {healthScore}
          </p>
          <p className={styles.time}>
            <span>Time:</span> {time} min
          </p>
          <p className={styles.diets}>
            <span>Diets:</span> {diets.map((diet) => diet).join(", ")}
          </p>
          <ul className={styles.steps}>
            <span>Steps:</span>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.closeBtn}
            onClick={() => {
              setShowRecipeModal(false);
            }}
          >
            Nope
          </button>
          <button
          type="submit"
            className={styles.createBtn}
            onClick={(e) => {
                handleSubmit(e);
            }}
          >
            Yeah!!!
          </button>
        </div>
      </div>
    </div>
  );
};

export { RecipeModal };
