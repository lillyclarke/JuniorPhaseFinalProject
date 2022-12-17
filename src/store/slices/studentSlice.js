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
    },
    setStudent: (state, action)=> {
      state.student = action.payload
    }
  }
});

export const { setStudents, setStudent } = studentSlice.actions

export default studentSlice.reducer
