import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/1-bg.png";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlerClick = (path) => {
    if (path !== "/home") return navigate("/home");
    navigate("/form");
  };

  const contentBtn = pathname === "/home" ? "Create Recipe" : "Go Home";

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <img
          onClick={() => {
            navigate("/home");
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
