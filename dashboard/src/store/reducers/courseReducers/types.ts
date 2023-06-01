export interface CourseState {
  allCourses: any;
  loading: boolean;
  message: string;
  isAuth: boolean;
  selectedCourse: any;
}

export enum CourseActionType {
  START_REQUEST = "START_REQUEST",
  ALL_COURSES_LOADED = "ALL_COURSES_LOADED",
  COURSE_LOADED = "COURSE_LOADED",
  FINISH_REQUEST = "FINISH_REQUEST",
}

interface StartRequestAction {
  type: CourseActionType.START_REQUEST;
}

interface FinishRequestAction {
  type: CourseActionType.FINISH_REQUEST;
  payload: any;
}

interface AllUsersLoadedAction {
  type: CourseActionType.ALL_COURSES_LOADED;
  payload: any;
}

interface CourseLoadedAction {
  type: CourseActionType.COURSE_LOADED;
  payload: any;
}

export type CourseActions =
  | FinishRequestAction
  | StartRequestAction
  | AllUsersLoadedAction
  | CourseLoadedAction;
