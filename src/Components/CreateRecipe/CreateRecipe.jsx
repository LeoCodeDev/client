import React, { useState } from "react";
import styles from "./CreateRecipe.module.css";
import { Navbar } from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, showRecipe } from "../../redux/actions";
import { formValidator } from "../../utils/formValidation.js";
import { ErrorModal } from "../ErrorModal/ErrorModal";
import { RecipeModal } from "../RecipeModal/RecipeModal";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = [...useSelector((state) => state.diets)];
  const [newDiet, setNewDiet] = useState(false);
  const [newDietName, setNewDietName] = useState(null);
  const [step, setStep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const [errors, setErrors] = useState({
    nameError: "",
    imageError: "",
    summaryError: "",
    healthScoreError: "",
    timeError: "",
    stepsError: "",
    dietsError: "",
  });

  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    time: "",
    steps: [],
    diets: [],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });

    if (id === "name") {
      setErrors({
        ...errors,
        nameError: formValidator.validateName(value)
          ? ""
          : "Name is required and must be less than 50 characters",
      });
    } else if (id === "image") {
      setErrors({
        ...errors,
        imageError: formValidator.validateImage(value)
          ? ""
          : "Image is required and must be a valid URL to an image (png, jpg, jpeg)",
      });
    } else if (id === "summary") {
      setErrors({
        ...errors,
        summaryError: formValidator.validateSummary(value)
          ? ""
          : "Summary is required and must be less than 256 characters",
      });
    } else if (id === "healthScore") {
      setErrors({
        ...errors,
        healthScoreError: formValidator.validateHealthScore(value)
          ? ""
          : "Health Score is required and must be a number between 1 and 100",
      });
    } else if (id === "time") {
      setErrors({
        ...errors,
        timeError: formValidator.validateTime(value)
          ? ""
          : "Time is required and must be a number between 5 and 600",
      });
    }
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

  const handleStepChange = (e) => {
    setStep(e.target.value);

    inputs.steps.length >= 1
      ? setErrors({
          ...errors,
          stepsError: "",
        })
      : setErrors({
          ...errors,
          stepsError: "You must add at least 1 step",
        });
  };

  const resetForm = () => {
    setInputs({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      time: "",
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

    inputs.diets.length >= 1
      ? setErrors({
          ...errors,
          dietsError: "",
        })
      : setErrors({
          ...errors,
          dietsError: "You must select at least 1 diet",
        });
  };

  const handleNewDiets = (e) => {
    const { value } = e.target;
    setNewDietName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDiets = newDietName?.split(",").map((diet) => diet.trim());
      const updatedInputs = {
        ...inputs,
        diets: newDietName ? [...inputs.diets, ...newDiets] : [...inputs.diets],
      };

      const recipeId = await dispatch(postRecipe(updatedInputs));
      await dispatch(showRecipe(recipeId));
      navigate(`/detail/${recipeId}`);
    } catch (error) {
      setErrorMessage(
        `Something went wrong, please try again. Error: ${error.message}`
      );
      setShowModal(true);
    }
  };

  const preSendInfo = (e) => {
    e.preventDefault();
    let showRecipe = true;
    let missingInfo;

    for (const key in inputs) {
      if (
        !inputs[key] ||
        (Array.isArray(inputs[key]) && inputs[key].length < 1)
      ) {
        showRecipe = false;
        missingInfo = key;
        console.log(key);
        break;
      }
    }

    if (!showRecipe) {
      setErrorMessage(`Please fill out the ${missingInfo} field`);
      setShowModal(true);
    } else {
      setShowRecipeModal(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <h2 className={styles.title}>Create your Recipe</h2>
        <div className={styles.infoContainer}>
          <h3 className={styles.infoTitle}>Instructions:</h3>
          <ul className={styles.infoList}>
            <li>All info is required</li>
            <li>
              Images must be an url to an image in format png, jpg or jpeg
            </li>
            <li>Each step must be added one by one</li>
            <li>Diets must be selected from the list</li>
          </ul>
        </div>
        <form className={styles.formContainer} onSubmit={preSendInfo}>
          <div className={styles.inputTextContainer}>
            <div className={styles.inputContainer}>
              <h3 className={styles.inputTitle}>Recipe Data</h3>
              <label htmlFor="name">Title or Name</label>
              <input
                id="name"
                onChange={handleInputChange}
                autoComplete="off"
                value={inputs.name}
              />
              {errors.nameError && (
                <p className={styles.errorText}>{errors.nameError}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                onChange={handleInputChange}
                autoComplete="off"
                value={inputs.image}
              />
              {errors.imageError && (
                <p className={styles.errorText}>{errors.imageError}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="summary">Summary</label>
              <input
                id="summary"
                onChange={handleInputChange}
                autoComplete="off"
                value={inputs.summary}
              />
              {errors.summaryError && (
                <p className={styles.errorText}>{errors.summaryError}</p>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="healthScore">Health Score (1-100)</label>
              <input
                id="healthScore"
                onChange={handleInputChange}
                autoComplete="off"
                value={inputs.healthScore}
              />
              {errors.healthScoreError && (
                <p className={styles.errorText}>{errors.healthScoreError}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="time">Minutes</label>
              <input
                id="time"
                onChange={handleInputChange}
                autoComplete="off"
                value={inputs.time}
              />
              {errors.timeError && (
                <p className={styles.errorText}>{errors.timeError}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="steps">Steps</label>
              <input
                id="steps"
                value={step}
                onChange={handleStepChange}
                autoComplete="off"
              />
              {errors.stepsError && (
                <p className={styles.errorText}>{errors.stepsError}</p>
              )}
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
            {errors.dietsError && (
              <p className={styles.errorText}>{errors.dietsError}</p>
            )}
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
      {showModal && (
        <ErrorModal message={errorMessage} setShowModal={setShowModal} />
      )}
      {showRecipeModal && (
        <RecipeModal
          inputs={inputs}
          setShowRecipeModal={setShowRecipeModal}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export { CreateRecipe };
