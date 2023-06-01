export interface CategoryState {
  allCategoryes: any;
  loading: boolean;
  message: string;
  isAuth: boolean;
  selectedCategory: any;
}

export enum CategoryActionType {
  START_REQUEST = "START_REQUEST",
  ALL_CATEGORYES_LOADED = "ALL_CATEGORYES_LOADED",
  CATEGORY_LOADED = "CATEGORY_LOADED",
  FINISH_REQUEST = "FINISH_REQUEST",
}

interface StartRequestAction {
  type: CategoryActionType.START_REQUEST;
}

interface FinishRequestAction {
  type: CategoryActionType.FINISH_REQUEST;
  payload: any;
}

interface AllCategoryesLoadedAction {
  type: CategoryActionType.ALL_CATEGORYES_LOADED;
  payload: any;
}

interface CategoryLoadedAction {
  type: CategoryActionType.CATEGORY_LOADED;
  payload: any;
}

export type CategoryActions =
  | FinishRequestAction
  | StartRequestAction
  | AllCategoryesLoadedAction
  | CategoryLoadedAction;
