import React, { useState } from "react";
import styles from "./CreateRecipe.module.css";
import { Navbar } from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe } from "../../redux/actions";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets = [...useSelector((state) => state.diets)];
  const [newDiet, setNewDiet] = useState(false);
  const [newDietName, setNewDietName] = useState("");
  const [step, setStep] = useState("");

  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 1,
    time: 1,
    steps: [],
    diets: [],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const handleStepChange = (e) => {
    setStep(e.target.value);
  };

  const addStep = () => {
    setInputs({ ...inputs, steps: [...inputs.steps, step] });
    setStep("");
  };

  const removeStep = (i) => {
    setInputs({
      ...inputs,
      steps: inputs.steps.filter((step, index) => index !== i),
    });
  };

  const resetForm = () => {
    setInputs({
      name: "",
      image: "",
      summary: "",
      healthScore: 0,
      time: 0,
      steps: [],
      diets: [],
    });
    setStep("");
  };

  const handleDiets = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setInputs({
        ...inputs,
        diets: [...inputs.diets, value],
      });
    } else {
      setInputs({
        ...inputs,
        diets: inputs.diets.filter((diet) => diet !== value),
      });
    }
  };

  const handleNewDiets = (e) => {
    const { value } = e.target;
    setNewDietName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newDiets = newDietName.split(",").map((diet) => diet.trim());
      const updatedInputs = {
        ...inputs,
        diets: [...inputs.diets, ...newDiets],
      };

      dispatch(postRecipe(updatedInputs));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <Navbar />
      <h2 className={styles.title}>Create your Recipe</h2>
      <div className={styles.infoContainer}>
        <h3 className={styles.infoTitle}>Instructions:</h3>
        <ul className={styles.infoList}>
          <li>All info is required</li>
          <li>Images must be an url to an image in format png, jpg or jpeg</li>
          <li>Each step must be added one by one</li>
          <li>Diets must be selected from the list</li>
        </ul>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputTextContainer}>
          <div className={styles.inputContainer}>
            <h3 className={styles.inputTitle}>Recipe Data</h3>
            <label htmlFor="name">Title or Name</label>
            <input
              type="text"
              id="name"
              onChange={handleInputChange}
              autoComplete="off"
              value={inputs.name}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="image">Image</label>
            <input
              type="url"
              id="image"
              onChange={handleInputChange}
              autoComplete="off"
              value={inputs.image}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="summary">Summary</label>
            <input
              type="text"
              id="summary"
              onChange={handleInputChange}
              autoComplete="off"
              value={inputs.summary}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="healthScore">Health Score (1-100)</label>
            <input
              type="number"
              id="healthScore"
              onChange={handleInputChange}
              autoComplete="off"
              value={inputs.healthScore}
              min={1}
              max={100}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="healthScore">Minutes</label>
            <input
              type="number"
              id="time"
              onChange={handleInputChange}
              autoComplete="off"
              value={inputs.time}
              min={1}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="steps">Steps</label>
            <input
              type="text"
              id="steps"
              value={step}
              onChange={handleStepChange}
              autoComplete="off"
            />
          </div>
          <button className={styles.stepsBtn} type="button" onClick={addStep}>
            Add Step
          </button>
          <div className={styles.showSteps}>
            {inputs.steps.length > 0 &&
              inputs.steps.map((step, i) => (
                <div key={i} className={styles.stepDiv}>
                  <button type="button" onClick={() => removeStep(i)}>
                    X
                  </button>
                  <p>{step}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.checkboxContainer}>
          <h3 className={styles.dietsTitle}>Diets</h3>
          {diets.map((diet, i) => (
            <div key={i + diet}>
              <input
                type="checkbox"
                value={diet}
                id={diet}
                onChange={handleDiets}
              />
              <label htmlFor={diet}>{diet}</label>
            </div>
          ))}
          <div>
            <input
              type="checkbox"
              id="other"
              onChange={() => setNewDiet(!newDiet)}
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className={styles.twoColumnSpan}>
          {newDiet && (
            <>
              <label htmlFor="newDiets">
                New Diet
                <span>
                  If you're adding more than one, separate them with a comma,
                  ex: "vegan, gluten free"
                </span>
              </label>
              <input
                autoComplete="off"
                type="text"
                onChange={handleNewDiets}
                id="newDiets"
              />
            </>
          )}
        </div>

        <button
          type="reset"
          className={`${styles.twoColumnSpan} ${styles.btnSubmit}`}
          onClick={resetForm}
        >
          Reset form
        </button>
        <button
          type="submit"
          className={`${styles.twoColumnSpan} ${styles.btnSubmit}`}
        >
          Create Recipe
        </button>
      </form>
    </section>
  );
};

export { CreateRecipe };
