import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { GET_LOCATIONS_FAILURE, GET_LOCATIONS_REQUEST, GET_LOCATIONS_SUCCESS } from "./actions";

function* getLocationsSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    const { id, entityType } = loginInfo;
    const response = yield call(Get, `/api/location/get-all-locations`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_LOCATIONS_SUCCESS, payload: response });
    } else {
      yield put({ type: GET_LOCATIONS_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_LOCATIONS_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_LOCATIONS_REQUEST, getLocationsSaga);
}