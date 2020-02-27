import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import courses from "./course/sagas";
import educators from "./educators/sagas"
import auth from "./auth/sagas";

export default function* rootSaga() {
  yield all([user(), menu(), settings(), courses(), educators(), auth()])
}
