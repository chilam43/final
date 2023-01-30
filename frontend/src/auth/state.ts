import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./clientSlice";

import logger from "redux-logger"; // Add this line

export let store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
