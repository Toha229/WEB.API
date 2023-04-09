import { Dispatch } from "redux";
import { UserActionType, UserActions } from "../../reducers/userReducers/types";
import {
  ChangePassword,
  Confirm,
  Delete,
  Edit,
  GetProfile,
  GetUsers,
  Incert,
  Login,
  Logout,
  Update,
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from "../../../services/api-user-service";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

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

// export const ConfirmUserEmail = (emailData: any) => {
//   console.log(emailData);
//   return async (dispatch: Dispatch<UserActions>) => {
//     setTimeout(() => console.log("response"), 100);
//     try {
//       dispatch({ type: UserActionType.START_REQUEST });
//       const data = await Confirm(emailData);
//       const { response } = data;

//       console.log(response);
//       if (response.success) {
//         dispatch({
//           type: UserActionType.FINISH_REQUEST,
//           payload: response.payload,
//         });
//       }
//     } catch {}
//   };
// };

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Login(user);
      const { response } = data;
      console.log("response ", response);

      if (response.success) {
        const { accessToken, refreshToken, message } = response;
        removeTokens();
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        toast.success(response.message);
        AuthUser(accessToken, response.message, dispatch);
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

export const LogOut = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Logout(id);
      const { response } = data;
      if (response.success) {
        removeTokens();
        toast.success(response.message);
        dispatch({
          type: UserActionType.LOGOUT_USER,
        });
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

export const ConfirmUserEmail = () => {};

export const UpdateUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Update(user);
      const { response } = data;

      if (response.success) {
        toast.success(response.message);
      } else {
        console.log("RESPONCE", response);
        toast.error(response.message);
      }
      dispatch({
        type: UserActionType.FINISH_REQUEST,
        payload: response.message,
      });
    } catch {}
  };
};

export const EditUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Edit(user);
      const { response } = data;

      if (response.success) {
        localStorage.removeItem("updateUser");
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

export const DeleteUser = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await Delete(email);
      const { response } = data;

      if (response.success) {
        localStorage.removeItem("updateUser");
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

export const ChangeUserPassword = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await ChangePassword(user);
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

export const AuthUser = (
  token: string,
  message: string,
  dispatch: Dispatch<UserActions>
) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionType.LOGIN_USER_SUCCESS,
    payload: {
      message,
      decodedToken,
    },
  });
};

export const GetAllUsers = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await GetUsers();
      const { response } = data;
      if (response.success) {
        dispatch({
          type: UserActionType.ALL_USERS_LOADED,
          payload: response.payload,
        });
      }
    } catch {}
  };
};

export const GetUserProfile = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionType.START_REQUEST });
      const data = await GetProfile(id);
      const { response } = data;
      if (response.success) {
        dispatch({
          type: UserActionType.USER_PROFILE_LOADED,
          payload: response.payload,
        });
      }
    } catch {}
  };
};
