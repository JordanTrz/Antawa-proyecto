import { createStore, combineReducers } from "redux";
import { authReducer, carReducer, publishReducer } from "./";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage,
}

const allReducers = combineReducers({
  auth: authReducer,
  car: carReducer,
  publish: publishReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

export { store, persistor };
