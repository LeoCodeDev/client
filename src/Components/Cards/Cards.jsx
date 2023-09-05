import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../Card/Card";
import { sort, filter } from "../../redux/actions";

const Cards = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.filteredRecipes);
  const filterOptions = useSelector((state) => state.filter);
  const orderOptions = useSelector((state) => state.sort);

  useEffect(() => {
    filterOptions.forEach((option) => dispatch(filter(option)));
    orderOptions.forEach((option) => dispatch(sort(option)));
  }, [orderOptions, filterOptions, dispatch]);

  return (
    <section>
      {recipes.map((recipe) => {
        return <Card key={recipe.name} recipe={recipe} />;
      })}
    </section>
  );
};

export { Cards };
