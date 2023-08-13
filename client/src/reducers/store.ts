import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AppReducer from ".";

export const store = configureStore({
  reducer: AppReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
