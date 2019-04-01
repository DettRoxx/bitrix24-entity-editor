import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import  { createLogger } from 'redux-logger';

import noticeReducer from '../reducers/noticeReducer';
import entityReducer from '../reducers/entityReducer';
import sectionReducer from '../reducers/sectionReducer';
import itemReducer from '../reducers/itemReducer';
import itemPropertyReducer from '../reducers/itemPropertyReducer';
import preloaderReducer from '../reducers/preloaderReducer';

import noticeMiddleware from '../middlewares/noticeMiddleware';
import generalMiddleware from '../middlewares/generalMiddleware';

let logger = process.env.NODE_ENV === "production" ? null : createLogger();

let middlewares = ([
  thunk,
  logger,
  noticeMiddleware,
  generalMiddleware
]).filter(Boolean);

const store = createStore(
  combineReducers({
    notice: noticeReducer,
    entity: entityReducer,
    section: sectionReducer,
    item: itemReducer,
    property: itemPropertyReducer,
    preloader: preloaderReducer
  }),
  applyMiddleware(...middlewares)
);

export default store;