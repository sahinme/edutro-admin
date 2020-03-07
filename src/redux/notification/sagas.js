import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import { GET_ENTITY_NOTIFICATIONS_FAILURE, GET_ENTITY_NOTIFICATIONS_REQUEST, GET_ENTITY_NOTIFICATIONS_SUCCESS } from './actions';

function* getEntityNotificaionsSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    yield put({ type: LOADER_START });
    const { id, entityType } = loginInfo;
    const response = yield call(Get, `/api/notification/get-notifies?ownerId=${id}&ownerType=${entityType}`, false);
    console.log(response && !response.errors);
    if (response) {
      yield put({ type: GET_ENTITY_NOTIFICATIONS_SUCCESS, payload: response.results });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_ENTITY_NOTIFICATIONS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_ENTITY_NOTIFICATIONS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}


export default function* Saga() {
  yield takeLatest(GET_ENTITY_NOTIFICATIONS_REQUEST, getEntityNotificaionsSaga);
}