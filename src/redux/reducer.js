import { GET_RECIPES, FIND_RECIPE, SHOW_RECIPE, FILTER, ORDER, POST_RECIPE } from "./actions";

const initialState = {
  recipes: [],
  recipe: {},
  filteredRecipes: [],
  order: "asc",
  filter: "all",
};

const rootReducer = () => {};

export { rootReducer, initialState };
