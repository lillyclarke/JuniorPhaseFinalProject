import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    student: {}
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload
    }
  }
});

export const { setStudents } = studentSlice.actions

export default studentSlice.reducer
