import { Get, PostFormData, Post } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from "helpers";
import { GET_TENANT_COURSES_SUCCESS, GET_TENANT_COURSES_FAILURE, GET_TENANT_COURSES_REQUEST, CREATE_COURSE_FAILURE, CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS } from "./actions";

function* getTenantCoursesSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
  try {
    const response = yield call(Get, `/api/course/get-entity-courses?entityType=${loginInfo.entityData.entityType}&id=${loginInfo.entityData.id}`, false);
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

function* createCourseSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
  delete payload.keys;
  delete payload.keysTeaching;
  delete payload.namesTeaching;
  delete payload.names;
  payload.ownerType = loginInfo.entityData.entityType;
  payload.ownerId = loginInfo.entityData.id;
  try {
    const response = yield call(PostFormData, `/api/course/create-course`, payload, {});
    if (response) {
      yield put({ type: CREATE_COURSE_SUCCESS, payload: response.results });
    } else {
      yield put({ type: CREATE_COURSE_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: CREATE_COURSE_FAILURE, payload: error });
  }
}


export default function* Saga() {
  yield takeLatest(GET_TENANT_COURSES_REQUEST, getTenantCoursesSaga);
  yield takeLatest(CREATE_COURSE_REQUEST, createCourseSaga);
}