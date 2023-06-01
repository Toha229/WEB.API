import { Dispatch } from "redux";
import {
  CourseActionType,
  CourseActions,
} from "../../reducers/courseReducers/types";
import { toast } from "react-toastify";

import {
  Delete,
  Get,
  GetAll,
  Incert,
  Update,
} from "../../../services/api-course-service";

export const IncertCourse = (course: any) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Incert(course);
      const { response } = data;

      if (response) {
        toast.success(response);
      } else {
        toast.error(response);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response,
      });
    } catch {}
  };
};

export const UpdateCourse = (course: any) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Update(course);
      const { response } = data;

      if (response) {
        toast.success(response);
      } else {
        toast.error(response);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response,
      });
    } catch {}
  };
};

export const GetAllCourses = () => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await GetAll();
      const { response } = data;
      console.log("GetAllCourses ", response);
      if (response.success) {
        dispatch({
          type: CourseActionType.ALL_COURSES_LOADED,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
    } catch {}
  };
};

export const GetCourse = (id: number) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Get(id);
      const { response } = data;
      console.log("GetCourse", response);
      if (response.success) {
        dispatch({
          type: CourseActionType.COURSE_LOADED,
          payload: response.payload,
        });
      } else {
        toast.error(response.message);
      }
    } catch {}
  };
};

export const DeleteCourse = (id: number) => {
  return async (dispatch: Dispatch<CourseActions>) => {
    try {
      dispatch({ type: CourseActionType.START_REQUEST });
      const data = await Delete(id);
      const { response } = data;

      if (response) {
        toast.success(response);
      } else {
        toast.error(response);
      }
      dispatch({
        type: CourseActionType.FINISH_REQUEST,
        payload: response,
      });
    } catch {}
  };
};
