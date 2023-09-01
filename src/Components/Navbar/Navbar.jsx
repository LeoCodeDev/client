import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/1-bg.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    
    const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo henry's kitchen" />
        <button className={styles.createBtn} onClick={()=>{navigate('/form')}}>Create Recipes</button>
      </div>
    </nav>
  );
};

export { Navbar };
