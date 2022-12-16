import React, { useEffect } from 'react';
import axios from 'axios';
import { setCampuses } from '../store/slices/campusSlice'; //we can't just call it, we gotta dispatch it (line below)
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; //for selecting the state
import { Link } from 'react-router-dom';

//one student is associated with one campus //a route to serve up all campuses
function Campuses() {
  const dispatch = useDispatch(); //connectd to line 4, it's to use the dispatch
  const campuses = useSelector(state => state.campus.campuses); //aka it gives you the campuses and it stores it in the campuses variable, useSelector gives you access to the state
  const getCampuses = async () => {
    const { data } = await axios.get('/api/campuses');
    console.log(data);
    dispatch(setCampuses(data)); //this takes the action.payload from campusSlice.js and it stores it in the campuses
    }
    useEffect(() => { //hook to import it, sends a request to the backend to show it
        getCampuses()
    }, [])

    //show a form in order to add more campuses and students
  return ( //mapping it due to it being an array
    <div>
      {campuses.map(campus => {
          return (
            <div key={campus.id}>
              <h1>{campus.name}</h1>
              <img src={campus.imageUrl} />
              <p>{campus.address}</p>
              <p>{campus.description}</p>
              <Link to={`/campuses/${campus.id}`}>View Campus</Link>
            </div>
            )
          }
        )}
    </div>
  )
};
//we are mapping over it, getting access to a single campus(is an object with name and id), then we display the image and such
//the link component is taking you to campuses/whatever the id is

export default Campuses;
