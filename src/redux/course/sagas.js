import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { push } from 'react-router-redux';
import { GET_TENANT_COURSES_SUCCESS, GET_TENANT_COURSES_FAILURE, GET_TENANT_COURSES_REQUEST } from "./actions";

function* getTenantCoursesSaga({ payload }) {
  try {
    const response = yield call(Get, "/api/course/get-all-courses", false);
    console.log(response);
    if (response) {
      yield put({ type: GET_TENANT_COURSES_SUCCESS, payload: response.results });
    } else {
      yield put({ type: GET_TENANT_COURSES_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_TENANT_COURSES_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_TENANT_COURSES_REQUEST, getTenantCoursesSaga);
}