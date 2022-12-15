import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { setCampus } from '../store/slices/campusSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//association between campus table //campus table needs four attributes with it(name, imageUrl, address, description)
//we'll be able to see a student on this page as well as remove or add a student
function Campus() {
    const dispatch = useDispatch()
    const campus = useSelector(state => state.campus.campus)
    const { campusId } = useParams()
    const getCampus = async () => {
      const { data } = await axios.get(/api/multipleCampuses/${campusId})
      console.log(data)
      dispatch(setCampus(data))
    }
    useEffect(() => {
      getCampus()
    }, [])

  return (
    <div>
        <h1>{campus.name}</h1>
        <img src={campus.imageUrl} />
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        {campus.students?.map(student => {
            return (
              <div key={student.id}>
                  <h1>{student.firstName} {student.lastName}</h1>
                  <p>{student.email}</p>
                  <p>{student.gpa}</p>
              </div>
            )
          }
        )}
    </div>
  )
};

export default Campus;
