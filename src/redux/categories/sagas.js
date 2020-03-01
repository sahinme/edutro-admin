import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS } from "./actions";

function* getCategoriesSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    const response = yield call(Get, `/api/category/get-all-categories`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_CATEGORIES_SUCCESS, payload: response });
    } else {
      yield put({ type: GET_CATEGORIES_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_CATEGORIES_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategoriesSaga);
}