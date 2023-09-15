import axios from "axios";

const GET_DIETS = "GET_DIETS";
const GET_RECIPES = "GET_RECIPES";
const FIND_RECIPE = "FIND_RECIPE";
const SHOW_RECIPE = "SHOW_RECIPE";
const FILTER = "FILTER";
const SORT = "SORT";
const POST_RECIPE = "POST_RECIPE";
const FILTER_AND_SORT = "FILTER_AND_SORT";

const getRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/recipes");
      dispatch({
        type: GET_RECIPES,
        payload: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

const getDiets = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("/diets");
      dispatch({
        type: GET_DIETS,
        payload: data,
      });
    } catch (error) {
      throw new Error({ error: error.message });
    }
  };
};

const findRecipe = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/recipes?name=${name}`);
      dispatch({
        type: FIND_RECIPE,
        payload: data,
      });
    } catch (error) {
      throw new Error({ error: error.message });
    }
  };
};

const showRecipe = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/recipes/${id}`);
      dispatch({
        type: SHOW_RECIPE,
        payload: data,
      });
    } catch (error) {
      throw new Error({ error: error.message });
    }
  };
};

const filter = (filter) => {
  return {
    type: FILTER,
    payload: filter,
  };
};

const sort = (sort) => {
  return {
    type: SORT,
    payload: sort,
  };
};

const filterAndSort = (option, type) => {
  return {
    type: FILTER_AND_SORT,
    payload: [option, type],
  };
};

const postRecipe = (recipe) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/recipes`, recipe);
      dispatch({
        type: POST_RECIPE,
        payload: data,
      });

      return data.id;
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export {
  GET_DIETS,
  GET_RECIPES,
  FIND_RECIPE,
  SHOW_RECIPE,
  FILTER,
  SORT,
  POST_RECIPE,
  FILTER_AND_SORT,
  getDiets,
  getRecipes,
  findRecipe,
  showRecipe,
  filter,
  sort,
  postRecipe,
  filterAndSort,
};
