import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { Transform, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "services/baseApi";
import { authReducer } from "./slices/authSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { encryptTransform } from "redux-persist-transform-encrypt";

// configuration dispatcher

// configuration encryption
const encrypt = encryptTransform({
  secretKey: "// configuration encryption",
});

/// configuration rootReducer and PersistentStore

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
  transforms: [encrypt],
};

const rootReducer = combineReducers({
  auth: authReducer,
  // completeUserInfo: completeUserInfoReducer,
  // theme: themeReducer,
  // advice: adviceReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * Use this instead of plain useDispatch for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

/**
 * Use this instead of useSelector for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

export const persistor = persistStore(store);

// https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

export default store;
