import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { GET_ENTITY_QUESTIONS_FAILURE, GET_ENTITY_QUESTIONS_REQUEST, GET_ENTITY_QUESTIONS_SUCCESS } from "./actions";

function* getEntityQuestionsSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    const { id, entityType } = loginInfo;
    const response = yield call(Get, `/api/question/get-entity-questions?entityId=${id}&${entityType}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_ENTITY_QUESTIONS_SUCCESS, payload: response.data });
    } else {
      yield put({ type: GET_ENTITY_QUESTIONS_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_ENTITY_QUESTIONS_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_ENTITY_QUESTIONS_REQUEST, getEntityQuestionsSaga);
}