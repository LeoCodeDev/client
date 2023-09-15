import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/1-bg.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlerClick = async (path) => {
    if (path !== "/home"){
      try {
        await dispatch(getRecipes())
      } catch (error) {
        console.log(error);
      }
      return navigate("/home");
    } 
    navigate("/form");
  };

  const contentBtn = pathname === "/home" ? "Create Recipe" : "Go Home";

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img
          onClick={() => {
            navigate("/");
          }}
          className={styles.logo}
          src={logo}
          alt="logo henry's kitchen"
        />
        <button
          className={styles.createBtn}
          onClick={() => {
            handlerClick(pathname);
          }}
        >
          {contentBtn}
        </button>
      </div>
    </nav>
  );
};

export { Navbar };
