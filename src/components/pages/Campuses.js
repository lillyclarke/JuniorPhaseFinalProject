import React, { useEffect } from 'react';
import axios from 'axios';
import { setCampuses } from '../store/slices/campusSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//one student is associated with one campus //a route to serve up all campuses
function Campuses() {
  const dispatch = useDispatch();
  const campuses = useSelector(state => state.campus.campuses);
  const getCampuses = async () => {
    const { data } = await axios.get('/api/Campuses');
    console.log(data);
    dispatch(setCampuses(data));
    }
    useEffect(() => {
        getCampuses()
    }, [])

    //show a form in order to add more campuses and students
  return (
    <div>
      {campuses.map(campus => {
          return (
            <div key={campus.id}>
              <h1>{campus.name}</h1>
              <img src={campus.imageUrl} />
              <p>{campus.address}</p>
              <p>{campus.description}</p>
            </div>
            )
          }
        )}
    </div>
  )
};

export default Campuses;
