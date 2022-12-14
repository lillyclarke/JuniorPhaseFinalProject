import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';
import { setStudent } from '../store/slices/studentSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Student(){
  const { studentId } = useParams(); //get the student id from the url
  const dispatch = useDispatch();
  const student = useSelector(state => state.student.student);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gpa, setGpa] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('')
  const [campusId, setCampusId] = React.useState('');

  //sends a request to the backend to update the student
  const improveStudent = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`/api/students/${studentId}`, {firstName, lastName, email, gpa, campusId: +campusId});
    dispatch(setStudent(data));
  };

  //sends a request to the backend to delete the student
  const obtainStudent = async () => {
    const { data } = await axios.get(`/api/students/${studentId}`);
    console.log(data);
    dispatch(setStudent(data)); //stores the student in the state
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setGpa(data.gpa);
    setCampusId(data.campusId);
  };

  //gets the student when the component mounts
  useEffect(() => {
    obtainStudent()
  }, []);

  return (
    <div>
      <h1>{student.firstName} {student.lastName}</h1>
      <p>{student.email}</p>
      <p>{student.gpa}</p>
      <p>{student.imageUrl}</p>
      <p>{student.campus?.name}</p>
      <Link to={`/campuses/${student.campusId}`}>{student.campus?.name}</Link>
      <form onSubmit={improveStudent}>
        <input type="text" placeholder="Students First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Students Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Students Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Students GPA" value={gpa} onChange={(e) => setGpa(e.target.value)} />
        <input type="text" placeholder="Student Campus" value={campusId} onChange={(e) => setCampusId(e.target.value)} />
        <button type="submit">Update the Students</button>
      </form>
    </div>
  )
};

export default Student;
