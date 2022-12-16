//here is where you will configure the store
import { configureStore } from "@reduxjs/toolkit";
import campusReducer from "./slices/campusSlice";

const store = configureStore({
  reducer: { //this is pretty much like the state
    campus: campusReducer,
  }
});

export default store;
