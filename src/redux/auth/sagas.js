import { message } from 'antd';
import { Post, Get } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { writeLocalStorage } from 'helpers';
import { LOADER_END, LOADER_START } from "redux/loader/loaderActions";
import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_REQUEST } from "./actions";

const error = () => {
    message.error('Kullanıcı adı veya şifre yanlış');
};

function* login({ payload }) {
    try {
        yield put({ type: LOADER_START });
        const response = yield call(Post, "/api/token/post/tenantOrEducatorToken", payload, false);
        if (response.status === 404) {
            yield put({ type: AUTH_SUCCESS, payload: response });
            yield put({ type: LOADER_END });
            error();
        }
        if (response && !response.errors) {
            writeLocalStorage("loginInfo", {
                token: response.token,
                entityData: response.loginData
            });
            yield put({ type: AUTH_SUCCESS, payload: response });
            yield put({ type: LOADER_END });
        } else {
            yield put({ type: AUTH_FAILURE, payload: response });
            error();
        }
    } catch (error) {
        yield put({ type: AUTH_FAILURE, payload: error });
        error()
    }
}

export default function* Saga() {
    yield takeLatest(AUTH_REQUEST, login);
}