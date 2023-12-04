import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function loadCourseSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses,
  };
}

export function createCourseSuccess(courses) {
  return { type: types.CREATE_COURSE_SUCCESS, courses };
}

export function updateCourseSuccess(courses) {
  return { type: types.UPDATE_COURSE_SUCCESS, courses };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(courses) {
  return function (dispatch) {
    return courseApi
      .saveCourse(courses)
      .then((savedCourse) => {
        courses.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
