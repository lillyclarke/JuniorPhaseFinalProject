//here is where you will configure the store
import { configureStore } from "@reduxjs/toolkit";
import campusReducer from "./slices/campusSlice";
import studentReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: { //this is pretty much like the state
    campus: campusReducer,
    student: studentReducer
  }
});

export default store;
