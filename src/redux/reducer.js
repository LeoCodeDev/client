import {
  FILTER,
  FIND_RECIPE,
  GET_DIETS,
  GET_RECIPES,
  SORT,
  POST_RECIPE,
  SHOW_RECIPE,
  FILTER_AND_SORT,
} from "./actions";

const initialState = {
  diets: [],
  filter: ["all"],
  filteredRecipes: [],
  sort: ["asc"],
  recipe: {},
  recipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };

    case FIND_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
      };

    case SHOW_RECIPE:
      if (Object.keys(state.recipe).length === 0) {
        return {
          ...state,
          recipe: action.payload,
        };
      } else {
        return {
          ...state,
          recipe: {},
        };
      }

    case FILTER:
      let filtered = [...state.recipes];

      if (action.payload === "all")
        return {
          ...state,
          filteredRecipes: filtered,
        };
      if (action.payload === "api") {
        return {
          ...state,
          filteredRecipes: filtered.filter(
            (recipe) => typeof recipe.id === "number"
          ),
        };
      }
      if (action.payload === "dbb") {
        return {
          ...state,
          filteredRecipes: filtered.filter(
            (recipe) => typeof recipe.id === "string"
          ),
        };
      }

      return {
        ...state,
        filteredRecipes: filtered.filter((recipe) =>
          recipe.diets.includes(action.payload)
        ),
      };

    case FILTER_AND_SORT:
      const [option, type] = action.payload;
      if (type === "filter") {
        if (!state.filter.includes(option) && option !== "all") {
          return {
            ...state,
            filter: [...state.filter, option],
          };
        } else if (!state.filter.includes(option) && option === "all") {
          return {
            ...state,
            filter: ["all"],
          };
        }
        return {
          ...state,
          filter: state.filter.filter((item) => item !== option),
        };
      } else if (type === "sort") {
        if (!state.sort.includes(option) && option !== "all") {
          return {
            ...state,
            sort: [...state.sort, option],
          };
        } else if (option === "all") {
          return {
            ...state,
            sort: [],
          };
        }

        return {
          ...state,
          sort: state.sort.filter((item) => item !== option),
        };
      }
      break;

    case SORT:
      let sorted = [...state.filteredRecipes];
      const sort = {
        abc: (a, b) => a.name.localeCompare(b.name),
        asc: (a, b) => b.healthScore - a.healthScore,
        des: (a, b) => a.healthScore - b.healthScore,
        zyx: (a, b) => b.name.localeCompare(a.name),
      };

      const sortFunc = sort[action.payload];

      if (action.payload !== "all") sorted.sort(sortFunc);

      return {
        ...state,
        filteredRecipes: [...sorted],
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
