import user from "./slices/user";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { REDUX_KEYS } from "@_helpers/constants";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  [REDUX_KEYS.REDUX_USER]: user,
});

const persistConfig = {
  key: REDUX_KEYS.REDUX,
  reducerVersion: "1",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false })
});

export const persistor = persistStore(store);
