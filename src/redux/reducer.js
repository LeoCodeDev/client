import {
  FILTER,
  FIND_RECIPE,
  GET_RECIPES,
  ORDER,
  POST_RECIPE,
  SHOW_RECIPE,
} from "./actions";

const initialState = {
  filter: "all",
  filteredRecipes: [],
  order: "asc",
  recipe: {},
  recipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };

    case FIND_RECIPE:
      return { ...state, recipe: action.payload };

    case SHOW_RECIPE:
      return { ...state, recipe: action.payload };

    case FILTER:
      let filtered = [...state.filteredRecipes];
      const selectedDiets = [...action.payload];
      if (selectedDiets.includes("all"))
        return { ...state, filteredRecipes: filtered };

      return {
        ...state,
        filteredRecipes: filtered.filter((recipe) =>
          recipe.diets.some((diet) => selectedDiets.includes(diet))
        ),
      };

    case ORDER:
      let ordered = [...state.filteredRecipes];
      const order = {
        abc: (a, b) => a.name.localeCompare(b.name),
        asc: (a, b) => a.healthScore - b.healthScore,
        des: (a, b) => b.healthScore - a.healthScore,
        zyx: (a, b) => b.name.localeCompare(a.name),
      };

      const orderFunc = order[action.payload];

      if (action.payload !== "all") ordered.sort(orderFunc);

      return {
        ...state,
        filteredRecipes: [...ordered],
      };

    case POST_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        recipe: action.payload,
      };

    default:
      return state;
  }
};

export { rootReducer, initialState };
