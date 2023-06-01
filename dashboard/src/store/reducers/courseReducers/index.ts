import {
  CourseState,
  CourseActions,
  CourseActionType,
} from "../courseReducers/types";

const initialState: CourseState = {
  allCourses: [],
  loading: false,
  message: "",
  isAuth: false,
  selectedCourse: null,
};
const CourseReducer = (
  state = initialState,
  action: CourseActions
): CourseState => {
  console.log("CourseState ", action);
  switch (action.type) {
    case CourseActionType.START_REQUEST:
      return { ...state, loading: true };
    case CourseActionType.ALL_COURSES_LOADED:
      return {
        ...state,
        loading: false,
        allCourses: action.payload,
        message: "",
      };
    case CourseActionType.FINISH_REQUEST:
      return { ...state, loading: false, message: action.payload };
    case CourseActionType.COURSE_LOADED:
      return { ...state, loading: false, selectedCourse: action.payload };

    default:
      return state;
  }
};
export default CourseReducer;
