// import "./components/styles.css";
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Campuses from './db/Campuses';
import Students from './db/Students';
import Campus from './db/Campus';
import Student from './db/Student';
import { Link } from 'react-router-dom'; //can combine with route and routes
import notFound from './db/ErrorPage';


//main component, parent of all the components //declaring routes linking it with components
function App() {
  return (
    <div>
      <Link to="/campuses">Campuses</Link>
      <Link to="/students">Students</Link>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/campuses/:campusId" element={<Campus />} />
        <Route path="/students/:studentId" element={<Student />} />
        <Route path="*" element={<errorPage />} />
      </Routes>
    </div>
  )
};

export default App;
