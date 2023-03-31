import { UserState, UserActions, UserActionType } from "./types";

const initialState: UserState = {
  allUsers: [],
  loading: false,
  message: "",
};
const UserReducer = (state = initialState, action: UserActions): UserState => {
  console.log("UserReducer", action);
  switch (action.type) {
    case UserActionType.START_REQUEST:
      return { ...state, loading: true };
    case UserActionType.ALL_USERS_LOADED:
      return { ...state, loading: false, allUsers: action.payload };
    case UserActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
