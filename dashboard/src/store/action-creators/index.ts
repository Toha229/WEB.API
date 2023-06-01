import * as UserActionCreators from "./userActions";
import * as CourseActionCreators from "./courseActions";
import * as CategoryActionCreators from "./categoryActions";

export default {
  ...UserActionCreators,
  ...CourseActionCreators,
  ...CategoryActionCreators,
};
