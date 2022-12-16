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
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  cpnst [gpa, setGpa] = React.useState('')
  const [campusId, setCampusId] = React.useState('')

  const getStudents = async () => {
    const { data } = await axios.get('/api/students')
    console.log(data)
    dispatch(setStudents(data))
  }

  useEffect(() => {
    getStudents()
  }, [])

  //function linked in return to add student button
  const createStudent = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/students', {firstName, lastName, email, gpa, campusId})
    console.log(data)
    dispatch(setStudents(data))
  }

  return (
    <div>
      <form onSubmit={createStudent}>
        <input type="text" placeholder="Students First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Students Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Students Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Students GPA" value={gpa} onChange={(e) => setGpa(e.target.value)} />
        <input type="text" placeholder="Student Campus" value={campusId} onChange={(e) => setCampusId(e.target.value)} />
        <button type="submit">Add Student</button>
      </form>
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
