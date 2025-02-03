// @import dependencies
import { combineReducers } from "@reduxjs/toolkit";
// @import slices
import loaderReducer from "./slices/loaderSlice";
import authSliceReducer from "./slices/authSlice";

const appReducer = combineReducers({
  loader: loaderReducer,
  auth: authSliceReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};
