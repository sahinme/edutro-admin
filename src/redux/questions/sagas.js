import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { success, error } from "components/CleanUIComponents/Message";
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import {
  GET_ENTITY_QUESTIONS_FAILURE, GET_ENTITY_QUESTIONS_REQUEST, GET_ENTITY_QUESTIONS_SUCCESS,
  GET_SELECTED_QUESTION_FAILURE, GET_SELECTED_QUESTION_REQUEST, GET_SELECTED_QUESTION_SUCCESS, CREATE_ANSWER_FAILURE, CREATE_ANSWER_SUCCESS, CREATE_ANSWER_REQUEST,
  getSelectedQuestionRequest
} from "./actions";

function* getEntityQuestionsSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    yield put({ type: LOADER_START });
    const { id, entityType } = loginInfo;
    const response = yield call(Get, `/api/question/get-entity-questions?entityId=${id}&entityType=${entityType}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_ENTITY_QUESTIONS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });

    } else {
      yield put({ type: GET_ENTITY_QUESTIONS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_ENTITY_QUESTIONS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getSelectedQuestionSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `/api/question/get-question-detail?id=${payload.id}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_SELECTED_QUESTION_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_SELECTED_QUESTION_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_SELECTED_QUESTION_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* createAnswerSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  const { id, entityType } = loginInfo;
  payload.entityType = entityType;
  payload.entityId = id;
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Post, `/api/question/create-answer`, payload, {}, false);
    console.log(response);
    if (response && !response.errors) {
      const obje = { id: payload.questionId };
      yield put(getSelectedQuestionRequest(obje));
      yield put({ type: CREATE_ANSWER_SUCCESS, payload: response.data });
      success("Mesajınız başarıyla gönderildi")
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: CREATE_ANSWER_FAILURE, payload: response });
      yield put({ type: LOADER_END });
      error("Mesaj gönderilemedi. Lütfen tekrar deneyin")
    }
  } catch (error) {
    yield put({ type: CREATE_ANSWER_FAILURE, payload: error });
    yield put({ type: LOADER_END });
    error("Mesaj gönderilemedi. Lütfen tekrar deneyin")
  }
}


export default function* Saga() {
  yield takeLatest(GET_ENTITY_QUESTIONS_REQUEST, getEntityQuestionsSaga);
  yield takeLatest(GET_SELECTED_QUESTION_REQUEST, getSelectedQuestionSaga);
  yield takeLatest(CREATE_ANSWER_REQUEST, createAnswerSaga);
}