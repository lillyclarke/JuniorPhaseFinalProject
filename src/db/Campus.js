import React from 'react';
import { useParams } from 'react-router-dom'; //use hook
import { useEffect } from 'react';
import axios from 'axios';
import { setCampus } from '../store/slices/campusSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createNextState } from '@reduxjs/toolkit';

//association between campus table //campus table needs four attributes with it(name, imageUrl, address, description)
function Campus() {
    const dispatch = useDispatch();
    const [name, setName] = useState(''); //changing the input will change the state and vise versa
    const [imageUrl, setImageUrl] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const campus = useSelector(state => state.campus.campus);
    const { campusId } = useParams();

    //function linked in return to create a campus
    const improvedCampus = async (e) => {
      e.preventDefault();
      const { data } = await axios.get(`/api/campuses/${campusId}`, {name, imageUrl, address, description});
      dispatch(setCampus(data));
    };

    //this is a function that gets all campuses with enrolled students
    const obtainCampus = async () => {
      const { data } = await axios.get(`/api/campuses/${campusId}`);
      dispatch(setCampus(data)); //dispatch that action and use the data and it'll be stored in the state
      setName(data.name);
      setImageUrl(data.imageUrl);
      setAddress(data.address);
      setDescription(data.description);
    };

    //hook to import it, sends a request to the backend to show it
    useEffect(() => {
      obtainCampus();
    }, []);

    //this is a function that gets all campuses with no students
    const unRegisterAStudent = async (studentId) => {
      try{
      const { data } = await axios.delete(`/api/campuses/${campus.id}/students/${studentId}`);
      dispatch(setCampus(data));
      }catch(err){
        next(err);
      }
    };

  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students?.map(student => {
        return (
          <div key={student.id}>
            <h1><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link></h1>
            <p>{student.email}</p>
            <p>{student.gpa}</p>
            <button onClick={()=>unRegisterAStudent(student.id)}>Unregister</button>
          </div>
        )
      }
    )}
      <form onSubmit={improvedCampus}>
        <input type="text" placeholder="Campus Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Campus Image Url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <input type="text" placeholder="Campus Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="Campus Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Updating the Campus</button>
      </form>
    </div>
  )
};

export default Campus;
