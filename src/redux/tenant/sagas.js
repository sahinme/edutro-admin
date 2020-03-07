import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { success, error } from "components/CleanUIComponents/Message";
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import { ADD_EDUCATOR_FAILURE, ADD_EDUCATOR_SUCCESS, ADD_EDUCATOR_REQUEST } from "./actions";

function* addEducatorSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  const { id, entityType } = loginInfo;
  payload.tenantId = id;
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Post, `/api/tenant/add-educator`, payload, {}, false);
    console.log(response);
    if (response && !response.errors) {
      yield put({ type: ADD_EDUCATOR_SUCCESS, payload: response.data });
      success("Talebiniz başarıyla gönderildi")
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: ADD_EDUCATOR_FAILURE, payload: response });
      yield put({ type: LOADER_END });
      error("Bu kullanıcıya zaten istek gönderilmiş")
    }
  } catch (error) {
    yield put({ type: ADD_EDUCATOR_FAILURE, payload: error });
    yield put({ type: LOADER_END });
    error("Bu kullanıcıya zaten istek gönderilmiş")
  }
}


export default function* Saga() {
  yield takeLatest(ADD_EDUCATOR_REQUEST, addEducatorSaga);
}