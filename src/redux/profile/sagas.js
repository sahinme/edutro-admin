import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { GET_PROFILE_INFO_FAILURE, GET_PROFILE_INFO_REQUEST, GET_PROFILE_INFO_SUCCESS } from "./actions";

function* getProfileInfoSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  const tenantUrl = `/api/tenant/get-by-ıd?id=${loginInfo.id}`;
  const educatorUrl = `/api/educator/get-educator-by-ıd?id=${loginInfo.id}`;
  try {
    const { entityType } = loginInfo;
    const response = yield call(Get, entityType === 20 ? educatorUrl : tenantUrl, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_PROFILE_INFO_SUCCESS, payload: response });
    } else {
      yield put({ type: GET_PROFILE_INFO_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_PROFILE_INFO_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_PROFILE_INFO_REQUEST, getProfileInfoSaga);
}