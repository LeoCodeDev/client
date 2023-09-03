import React from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/background-food.mp4";
import logo from "../assets/1-bg.png";
import styles from "./Landing.module.css";
import { getRecipes } from "../redux/actions";
import { useDispatch } from "react-redux";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const clickHandler = ()=>{
    dispatch(getRecipes())
    navigate("/home");
  }

  return (
    <div className={styles.landingContainer}>
      <video className={styles.videoBg} autoPlay muted loop>
        <source className={styles.source} src={video} type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <img className={styles.logo} src={logo} alt="logo henry's kitchen" />
        <button
          className={styles.button}
          onClick={clickHandler}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export { Landing };
