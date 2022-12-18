import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { setStudents } from '../store/slices/studentSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//the student page will have firstName, lastName, email, imageUrl, and gpa associated with a student
function Students() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.student.students);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gpa, setGpa] = React.useState('');
  const [campusId, setCampusId] = React.useState('');

  const getStudents = async () => {
    const { data } = await axios.get('/api/students');
    dispatch(setStudents(data));
  };

  useEffect(() => {
    getStudents()
  }, []);

  //function linked in return to add student button
  const createStudent = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/students', {firstName, lastName, email, gpa, campusId: +campusId});
    dispatch(setStudents(data));
  };

  //delete button for student
  const deleteStudent = async (id) => {
    const { data } = await axios.delete(`/api/students/${id}`);
    dispatch(setStudents(data));
  };

  //need to edit this!!!
  let sortBy = (e) => {
    if (e.target.value === 'lastName') { // if the value of the select is lastName
      let studentsCopy = [...students]
        studentsCopy.sort((a,b) => {
            if (a.lastName < b.lastName) {
                return -1
            } else if (a.lastName > b.lastName) {
                return 1
            } else {
                return 0
            }
        })
        dispatch(setStudents(studentsCopy))

    } else if (e.target.value === 'gpa') { // if the value of the select is gpa
      let studentsCopy = [...students]
        studentsCopy.sort((a,b) => {
            if (a.gpa > b.gpa) {
                return -1
            } else if (a.gpa < b.gpa) {
                return 1
            } else {
                return 0
            }
        })
        dispatch(setStudents(studentsCopy))
    }
    else if (e.target.value === 'unregistered') { // if the value of the select is unregistered
      let studentsCopy = [...students]
      studentsCopy = studentsCopy.filter(student => student.campusId === null)
      dispatch(setStudents(studentsCopy))
} else if (e.target.value === 'all') { // if the value of the select is all
  getStudents()
}
};

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
      <select onChange={sortBy}>
        <option value="all">Show all Students</option>
        <option value="lastName">Sort by Last Name</option>
        <option value="gpa">Sort by GPA</option>
        <option value="unregistered">Show unregistered Students</option>
      </select>
      {students.map(student => {
        return (
          <div key={student.id}>
            <h1>{student.firstName} {student.lastName}</h1>
            <p>{student.email}</p>
            <p>{student.gpa}</p>
            <Link to={`/students/${student.id}`}>View Student</Link>
            <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
          </div>
        )
      })}
    </div>
  )
};

export default Students;
