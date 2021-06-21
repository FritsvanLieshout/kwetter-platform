import { createStore, combineReducers, compose } from "redux";
import rootReducer from "redux/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

function configureStore() {
  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(persistedReducer, storeEnhancers());
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
