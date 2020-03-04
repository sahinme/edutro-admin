import { Get, Post,PostFormData } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { push } from 'react-router-redux';
import { success, error } from "components/CleanUIComponents/Message";
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import { GET_TENANT_BLOG_FAILURE, GET_TENANT_BLOG_REQUEST, GET_TENANT_BLOG_SUCCESS,CREATE_BLOG_POST_REQUEST,CREATE_BLOG_POST_FAILURE,CREATE_BLOG_POST_SUCCESS } from "./actions";

function* getTenantBlogSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    const { id, entityType } = loginInfo;
    const response = yield call(Get, `/api/question/get-entity-questions?entityId=${id}&${entityType}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_TENANT_BLOG_SUCCESS, payload: response.data });
    } else {
      yield put({ type: GET_TENANT_BLOG_FAILURE, payload: response });
    }
  } catch (error) {
    yield put({ type: GET_TENANT_BLOG_FAILURE, payload: error });
  }
}

function* createBlogPostSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
 
  const ownerType = loginInfo.entityData.entityType;
  const  ownerId = loginInfo.entityData.id;

  if (loginInfo.entityData.entityType === 10) {
      payload.tenantId = ownerId;
  }
  if (loginInfo.entityData.entityType === 20) {
    payload.educatorId = ownerId
  }

  try {
    yield put({ type: LOADER_START });
    const response = yield call(PostFormData, `/api/post/create-post`, payload, {});
    if (!response.errors) {
      yield put(push('/blog/feed'));
      success("Yazi başarıyla oluşturuldu")
      yield put({ type: CREATE_BLOG_POST_SUCCESS, payload: response.results });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: CREATE_BLOG_POST_FAILURE, payload: response });
      error('Yazi oluşturulamadı')
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: CREATE_BLOG_POST_FAILURE, payload: error });
    error('Yazi oluşturulamadı')
    yield put({ type: LOADER_END });
  }
}


export default function* Saga() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createBlogPostSaga);
}