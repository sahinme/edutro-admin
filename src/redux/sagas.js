import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import courses from "./course/sagas";
import educators from "./educators/sagas"
import auth from "./auth/sagas";
import questions from "./questions/sagas";
import profile from "./profile/sagas";
import locations from "./locations/sagas";
import categories from "./categories/sagas";

export default function* rootSaga() {
  yield all([user(), menu(), settings(), courses(), educators(), auth(), questions(), profile(), locations(), categories()])
}
