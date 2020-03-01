import { message } from 'antd';
import { Post, Get } from "redux/services";
import { call, put, takeLatest } from "redux-saga/effects";
import { writeLocalStorage } from 'helpers';
import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_REQUEST } from "./actions";

const error = () => {
    message.error('Kullanici adi veya sifre yanlis');
};

function* login({ payload }) {
    try {
        const response = yield call(Post, "/api/token/post/tenantOrEducatorToken", payload, false);
        if (response && !response.errors) {
            writeLocalStorage("loginInfo", {
                token: response.token,
                entityData: response.loginData
            });
            yield put({ type: AUTH_SUCCESS, payload: response });
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