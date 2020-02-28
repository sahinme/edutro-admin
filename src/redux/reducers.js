import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import courses from "./course/reducers";
import educators from "./educators/reducers";
import auth from "./auth/reducers";
import questions from "./questions/reducers";
import profile from "./profile/reducers";

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    courses,
    educators,
    auth,
    questions,
    profile
  })
