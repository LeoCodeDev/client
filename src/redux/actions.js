import axios from "axios";

const GET_DIETS = "GET_DIETS";
const GET_RECIPES = "GET_RECIPES";
const FIND_RECIPE = "FIND_RECIPE";
const SHOW_RECIPE = "SHOW_RECIPE";
const FILTER = "FILTER";
const ORDER = "ORDER";
const POST_RECIPE = "POST_RECIPE";

const getRecipes = () => {
  const endpoint = "http://localhost:3001/recipes";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      dispatch({
        type: GET_RECIPES,
        payload: data,
      });
    } catch (error) {
      throw new Error({ error: error.message });
    }
  };
};

const getDiets = () => {
  const endpoint = "http://localhost:3001/diets";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
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
  const endpoint = `http://localhost:3001/recipes?name=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
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
  const endpoint = `http://localhost:3001/recipes/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
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

const order = (order) => {
  return {
    type: FILTER,
    payload: order,
  };
};

const postRecipe = (recipe) => {
  const endpoint = "http://localhost:3001/recipes";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, recipe);
      dispatch({
        type: POST_RECIPE,
        payload: data,
      });
    } catch (error) {
      throw new Error({ error: error.message });
    }
  };
};

export {
  GET_DIETS,
  GET_RECIPES,
  FIND_RECIPE,
  SHOW_RECIPE,
  FILTER,
  ORDER,
  POST_RECIPE,
  getDiets,
  getRecipes,
  findRecipe,
  showRecipe,
  filter,
  order,
  postRecipe,
};
