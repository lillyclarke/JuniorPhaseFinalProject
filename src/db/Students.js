import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { setStudents } from '../store/slices/studentSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//the student page per say will have firstName, lastName, email, imageUrl, and gpa
//is a component but will act as a page
function Students() {
  const dispatch = useDispatch()
  const students = useSelector(state => state.studnt.students)
  const getStudents = async () => {
    const { data } = await axios.get('/api/students')
    console.log(data)
    dispatch(setStudents(data))
  }
  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div>
      {students.map(student => {
        return (
          <div key={student.id}>
            <h1>{student.firstName} {student.lastName}</h1>
            <p>{student.email}</p>
            <p>{student.gpa}</p>
            <Link to={`/students/${student.id}`}>View Student</Link>
          </div>
        )
      })}
    </div>
  )
};

export default Students;
