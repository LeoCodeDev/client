import React from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/background-food.mp4";
import logo from "../assets/1-bg.png";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landingContainer}>
      <video className={styles.videoBg} autoPlay muted loop>
        <source className={styles.source} src={video} type="video/mp4" />
      </video>
      <div className={styles.overlay}>
        <img className={styles.logo} src={logo} alt="logo henry's kitchen" />
        <button
          className={styles.button}
          onClick={() => {
            navigate("/home");
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export { Landing };
