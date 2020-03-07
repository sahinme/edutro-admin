import { Get, Post, PostFormData, PutFormData } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { readLocalStorage } from 'helpers';
import { push } from 'react-router-redux';
import { success, error } from "components/CleanUIComponents/Message";
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import {
  GET_BLOG_POSTS_REQUEST, GET_BLOG_POSTS_FAILURE, GET_BLOG_POSTS_SUCCESS, CREATE_BLOG_POST_REQUEST,
  CREATE_BLOG_POST_FAILURE, CREATE_BLOG_POST_SUCCESS, GET_SELECTED_POST_FAILURE, GET_SELECTED_POST_REQUEST, GET_SELECTED_POST_SUCCESS,
  EDIT_BLOG_POST_FAILURE, EDIT_BLOG_POST_SUCCESS, EDIT_BLOG_POST_REQUEST
} from "./actions";

function* getEntityBlogPostsSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo').entityData;
  try {
    yield put({ type: LOADER_START });
    const { id, entityType } = loginInfo;
    const response = yield call(Get, `/api/post/get-entity-post?entityType=${entityType}&id=${id}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_BLOG_POSTS_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_BLOG_POSTS_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_BLOG_POSTS_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* getSelectedBlogPostsSaga({ payload }) {
  try {
    yield put({ type: LOADER_START });
    const response = yield call(Get, `/api/post/get-post/by-id?id=${payload.id}`, false);
    console.log(response);
    if (response) {
      yield put({ type: GET_SELECTED_POST_SUCCESS, payload: response });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: GET_SELECTED_POST_FAILURE, payload: response });
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: GET_SELECTED_POST_FAILURE, payload: error });
    yield put({ type: LOADER_END });
  }
}

function* createBlogPostSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');

  const ownerType = loginInfo.entityData.entityType;
  const ownerId = loginInfo.entityData.id;

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

function* updateBlogPostSaga({ payload }) {
  const loginInfo = readLocalStorage('loginInfo');
  try {
    yield put({ type: LOADER_START });
    const response = yield call(PutFormData, `/api/post/update-post`, payload, {});
    if (!response.errors) {
      yield put(push('/blog/feed'));
      success("Yazi başarıyla güncellendi")
      yield put({ type: EDIT_BLOG_POST_SUCCESS, payload: response.results });
      yield put({ type: LOADER_END });
    } else {
      yield put({ type: EDIT_BLOG_POST_FAILURE, payload: response });
      error('Yazi güncellennemedi')
      yield put({ type: LOADER_END });
    }
  } catch (error) {
    yield put({ type: EDIT_BLOG_POST_FAILURE, payload: error });
    error('Yazi güncellennemedi')
    yield put({ type: LOADER_END });
  }
}


export default function* Saga() {
  yield takeLatest(CREATE_BLOG_POST_REQUEST, createBlogPostSaga);
  yield takeLatest(GET_BLOG_POSTS_REQUEST, getEntityBlogPostsSaga);
  yield takeLatest(GET_SELECTED_POST_REQUEST, getSelectedBlogPostsSaga);
  yield takeLatest(EDIT_BLOG_POST_REQUEST, updateBlogPostSaga);
}