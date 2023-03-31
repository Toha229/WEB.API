export interface UserState {
  allUsers: any;
  loading: boolean;
  message: string;
}

export enum UserActionType {
  START_REQUEST = "START_REQUEST",
  ALL_USERS_LOADED = "ALL_USERS_LOADED",
  FINISH_REQUEST = "FINISH_REQUEST",
}

interface StartRequestAction {
  type: UserActionType.START_REQUEST;
}

interface FinishRequestAction {
  type: UserActionType.FINISH_REQUEST;
  payload: any;
}

interface AllUsersLoadedAction {
  type: UserActionType.ALL_USERS_LOADED;
  payload: any;
}

export type UserActions =
  | FinishRequestAction
  | StartRequestAction
  | AllUsersLoadedAction;
