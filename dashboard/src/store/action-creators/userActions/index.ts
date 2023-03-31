import { Dispatch } from "redux";
import { UserActionType, UserActions } from "../../reducers/userReducers/types";
import { Incert, Login } from "../../../services/api-user-service";
import { toast } from "react-toastify";

export const IncertUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Incert(user);
      const { response } = data;

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Login(user);
      const { response } = data;

      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
    } else {
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};
