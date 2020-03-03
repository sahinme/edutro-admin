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
import selectedCourse from "./course/selectedCourseReducer";
import locations from "./locations/reducers";
import categories from "./categories/reducers";
import loader from "./loader/loaderReducer";

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
    profile,
    selectedCourse,
    locations,
    categories,
    loader
  })
