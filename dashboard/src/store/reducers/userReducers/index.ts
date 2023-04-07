import { UserState, UserActions, UserActionType } from "./types";

const initialState: UserState = {
  allUsers: [],
  loading: false,
  message: "",
  isAuth: false,
  user: {},
  profile: {},
  selectedUser: null,
};
const UserReducer = (state = initialState, action: UserActions): UserState => {
  console.log("UserReducer", action);
  switch (action.type) {
    case UserActionType.START_REQUEST:
      return { ...state, loading: true };
    case UserActionType.ALL_USERS_LOADED:
      return { ...state, loading: false, allUsers: action.payload };
    case UserActionType.USER_PROFILE_LOADED:
      return { ...state, loading: false, profile: action.payload, message: "" };
    case UserActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    case UserActionType.EDIT_USER:
        return { ...state, loading: false, selectedUser: action.payload };
    case UserActionType.PROFILE_UPDATED:
      return { ...state, loading: false, selectedUser: null, message: "" };
    case UserActionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionType.LOGOUT_USER:
      return {
        allUsers: [],
        loading: false,
        message: "",
        isAuth: false,
        user: {},
        profile: {},
        selectedUser: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
