import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Campuses from './db/Campuses';
import Students from './db/Students';
import Campus from './db/Campus';
import Student from './db/Student';
import { Link } from 'react-router-dom'; //can combine with route and routes
import  "./style.css";
import NotFound from './db/NotFound';


//main component, the parent of all of the components //this is making it so that if you go to the /Campuses you'll get campuses and students with the path /students
function App() {
  return (
    <div>
      <Link to="/campuses">Campuses</Link>
      <Link to="/students">Students</Link>
      <Routes>
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/campuses/:campusId" element={<Campus />} />
        <Route path="/students/:studentId" element={<Student />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
};

export default App;
