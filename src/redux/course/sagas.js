import { Get, PostFormData, Post, PutFormData } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from "helpers";
import { success, error } from "components/CleanUIComponents/Message";
import { push } from 'react-router-redux';
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import {
  GET_TENANT_COURSES_SUCCESS, GET_TENANT_COURSES_FAILURE, GET_TENANT_COURSES_REQUEST, CREATE_COURSE_FAILURE,
  CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS, GET_SELECTED_COURSE_FAILURE, GET_SELECTED_COURSE_REQUEST, GET_SELECTED_COURSE_SUCCESS,
  EDIT_COURSE_REQUEST, EDIT_COURSE_SUCCESS, EDIT_COURSE_FAILURE
} from "./actions";

function* getTenantCoursesSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `/api/course/get-entity-courses?entityType=${loginInfo.entityData.entityType}&id=${loginInfo.entityData.id}`, {}, {}, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_TENANT_COURSES_SUCCESS, payload: response.results });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_TENANT_COURSES_FAILURE, payload: response });
      yield put({ type: LOADER_START });
    }
  } catch (error) {
    yield put({ type: GET_TENANT_COURSES_FAILURE, payload: error });
    yield put({ type: LOADER_END });
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
  const tenantId = [];
  const educatorId = [];
  if (loginInfo.entityData.entityType === 10) {
    tenantId.push(loginInfo.entityData.id)
    payload.tenantId = tenantId;

  }
  if (loginInfo.entityData.entityType === 20) {
    educatorId.push(loginInfo.entityData.id);
    payload.educatorId = educatorId;
  }
  try {
    yield put({ type: LOADER_START });
    const response = yield call(PostFormData, `/api/course/create-course`, payload, {});
    if (!response.errors) {
      yield put(push('/egitimler/egitimlerim'));
      success("Eğitiminiz başarıyla oluşturuldu")
      yield put({ type: CREATE_COURSE_SUCCESS, payload: response.results });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: CREATE_COURSE_FAILURE, payload: response });
      error('Egitim oluşturulamadı')
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: CREATE_COURSE_FAILURE, payload: error });
    error('Egitim oluşturulamadı')
    yield put({ type: LOADER_END });
  }
}

function* editCourseSaga({ payload }) {
  debugger;
  const loginInfo = readLocalStorage('loginInfo');
  delete payload.keys;
  delete payload.keysTeaching;
  delete payload.namesTeaching;
  delete payload.names;
  payload.ownerType = loginInfo.entityData.entityType;
  payload.ownerId = loginInfo.entityData.id;
  const tenantId = [];
  const educatorId = [];
  if (loginInfo.entityData.entityType === 10) {
    tenantId.push(loginInfo.entityData.id)
    payload.tenantId = tenantId;

  }
  if (loginInfo.entityData.entityType === 20) {
    educatorId.push(loginInfo.entityData.id);
    payload.educatorId = educatorId;
  }
  try {
    yield put({ type: LOADER_START });
    const response = yield call(PutFormData, `/api/course/update-course?id=${payload.id}`, payload, {});
    if (!response.errors) {
      yield put(push('/egitimler/egitimlerim'));
      success("Eğitiminiz başarıyla güncellendi")
      yield put({ type: EDIT_COURSE_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: EDIT_COURSE_FAILURE, payload: response });
      error('Egitim güncellenemedi')
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: EDIT_COURSE_FAILURE, payload: error });
    error('Egitim güncellenemedi')
    yield put({ type: LOADER_END });
  }
}

function* getSelectedCourseSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `/api/course/get-course/by-id?id=${payload.id}`, {}, {}, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_SELECTED_COURSE_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_SELECTED_COURSE_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_SELECTED_COURSE_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}


export default function* Saga() {
  yield takeLatest(GET_TENANT_COURSES_REQUEST, getTenantCoursesSaga);
  yield takeLatest(CREATE_COURSE_REQUEST, createCourseSaga);
  yield takeLatest(GET_SELECTED_COURSE_REQUEST, getSelectedCourseSaga);
  yield takeLatest(EDIT_COURSE_REQUEST, editCourseSaga);
}