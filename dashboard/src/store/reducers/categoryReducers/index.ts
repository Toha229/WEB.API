import {
  CategoryState,
  CategoryActions,
  CategoryActionType,
} from "../categoryReducers/types";

const initialState: CategoryState = {
  allCategoryes: [],
  loading: false,
  message: "",
  isAuth: false,
  selectedCategory: null,
};
const CategoryReducer = (
  state = initialState,
  action: CategoryActions
): CategoryState => {
  console.log("CategoryState ", action);
  switch (action.type) {
    case CategoryActionType.START_REQUEST:
      return { ...state, loading: true };
    case CategoryActionType.ALL_CATEGORYES_LOADED:
      return {
        ...state,
        loading: false,
        allCategoryes: action.payload,
        message: "",
      };
    case CategoryActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    case CategoryActionType.CATEGORY_LOADED:
      return { ...state, loading: false, selectedCategory: action.payload };

    default:
      return state;
  }
};
export default CategoryReducer;
