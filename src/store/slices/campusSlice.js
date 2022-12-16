import { createSlice } from '@reduxjs/toolkit'

export const campusSlice = createSlice({
  name: 'campus',
  initialState: { //this state has campuses
    campuses: [], //multiple campuses
    campus: {} //second campus
  },
  reducers: {
    setCampuses: (state, action) => {
      state.campuses = action.payload //is the data
    },
    setCampus: (state, action) => {
      state.campus = action.payload
    }
  }
});

export const {setCampuses, setCampus} = campusSlice.actions;

export default campusSlice.reducer;
