import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { push } from 'react-router-redux';
import { GET_TENANT_QUESTIONS_SUCCESS, GET_TENANT_QUESTIONS_FAILURE, GET_TENANT_QUESTIONS_REQUEST } from "./actions";

function* getTenantQuestionsSaga({ payload }) {
  debugger;
  try {
    const response = yield call(Get, "/api/course/get-all-courses", false);
    console.log(response);
    if (response) {
      yield put({ type: GET_TENANT_QUESTIONS_SUCCESS, payload: response.data });
    } else {
      yield put({ type: GET_TENANT_QUESTIONS_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_TENANT_QUESTIONS_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_TENANT_QUESTIONS_REQUEST, getTenantQuestionsSaga);
}