export const GET_TENANT_COURSES_REQUEST = 'GET_TENANT_COURSES_REQUEST';
export const GET_TENANT_COURSES_SUCCESS = 'GET_TENANT_COURSES_SUCCESS';
export const GET_TENANT_COURSES_FAILURE = 'GET_TENANT_COURSES_FAILURE';

export const GET_SELECTED_COURSE_REQUEST = 'GET_SELECTED_COURSE_REQUEST';
export const GET_SELECTED_COURSE_SUCCESS = 'GET_SELECTED_COURSE_SUCCESS';
export const GET_SELECTED_COURSE_FAILURE = 'GET_SELECTED_COURSE_FAILURE';

export const CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAILURE = 'CREATE_COURSE_FAILURE';

export const EDIT_COURSE_REQUEST = 'EDIT_COURSE_REQUEST';
export const EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS';
export const EDIT_COURSE_FAILURE = 'EDIT_COURSE_FAILURE';

export const getTenantCoursesRequest = payload => ({
  type: GET_TENANT_COURSES_REQUEST,
  payload,
});

export const createCourseRequest = payload => ({
  type: CREATE_COURSE_REQUEST,
  payload,
});

export const editCourseRequest = payload => ({
  type: EDIT_COURSE_REQUEST,
  payload,
});

export const getSelectedCourseRequest = payload => ({
  type: GET_SELECTED_COURSE_REQUEST,
  payload,
});

