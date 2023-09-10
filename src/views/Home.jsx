import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import { SearchBar } from "../Components/SearchBar/SearchBar";
import { Buttons } from "../Components/Buttons/Buttons";
import { Cards } from "../Components/Cards/Cards";
import { useDispatch } from "react-redux";
import { getDiets } from "../redux/actions";
import { ErrorModal } from "../Components/ErrorModal/ErrorModal";

const Home = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  try {
    useEffect(() => {
      dispatch(getDiets());
    }, [dispatch]);
  } catch (error) {
    setShowModal(true);
  }

  return (
    <>
      <Navbar />
      <SearchBar />
      <Buttons />
      <Cards />
      {showModal && (
        <ErrorModal
          setShowModal={setShowModal}
          message={"Something went wrong, please try again"}
        />
      )}
    </>
  );
};

export { Home };
