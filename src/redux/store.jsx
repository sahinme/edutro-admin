import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/reducers';
import rootSaga from 'redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  ...rootReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO:Persist entegre edilecek!
export const store = createStore(
  reducer,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
