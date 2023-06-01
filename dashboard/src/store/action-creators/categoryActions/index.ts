import { Dispatch } from "redux";

import { toast } from "react-toastify";
import {
  CategoryActionType,
  CategoryActions,
} from "../../reducers/categoryReducers/types";
import {
  Delete,
  GetAll,
  Incert,
  Update,
} from "../../../services/api-category-service";

export const IncertCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await Incert(category);
      const { response } = data;

      if (response) {
        toast.success(response);
      } else {
        toast.error(response);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response,
      });
    } catch {}
  };
};

export const UpdateCategory = (category: any) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await Update(category);
      const { response } = data;

      if (response) {
        toast.success(response);
      } else {
        toast.error(response);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response,
      });
    } catch {}
  };
};

export const GetAllCategorys = () => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await GetAll();
      const { response } = data;
      console.log("GetAllCategorys ", response);
      if (response.success) {
        dispatch({
          type: CategoryActionType.ALL_CATEGORYES_LOADED,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
    } catch {}
  };
};

// export const GetCategory = (id: number) => {
//   return async (dispatch: Dispatch<CategoryActions>) => {
//     try {
//       dispatch({ type: CategoryActionType.START_REQUEST });
//       const data = await GetAll();
//       const { response } = data;
//       console.log("GetCategory", response);
//       if (response.success) {
//         dispatch({
//           type: CategoryActionType.CATEGORY_LOADED,
//           payload: response.payload,
//         });
//       } else {
//         toast.error(response.message);
//       }
//     } catch {}
//   };
// };

export const DeleteCategory = (id: number) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });
      const data = await Delete(id);
      const { response } = data;

      if (response == "Category deleted") {
        toast.success(response);
      } else {
        toast.error(response);
      }
      dispatch({
        type: CategoryActionType.FINISH_REQUEST,
        payload: response,
      });
    } catch {}
  };
};
