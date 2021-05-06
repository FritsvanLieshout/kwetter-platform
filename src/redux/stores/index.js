import { createStore, combineReducers, compose } from "redux";
import rootReducer from "redux/reducers";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers());

export default store;
