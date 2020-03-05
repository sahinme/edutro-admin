import { Get, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from "helpers";
import { GET_TENANT_EDUCATORS_SUCCESS, GET_TENANT_EDUCATORS_FAILURE, GET_TENANT_EDUCATORS_REQUEST } from "./actions";

function* getTenantEducatorsSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
  try {
    const response = yield call(Get, `/api/tenant/get-educators?id=${loginInfo.entityData.id}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_TENANT_EDUCATORS_SUCCESS, payload: response[0].tenantEducators });
    } else {
      yield put({ type: GET_TENANT_EDUCATORS_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_TENANT_EDUCATORS_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_TENANT_EDUCATORS_REQUEST, getTenantEducatorsSaga);
}