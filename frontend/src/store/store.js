import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer"; // Import reducer

const store = configureStore({
  reducer: rootReducer, // Add reducers here
});

export default store;
