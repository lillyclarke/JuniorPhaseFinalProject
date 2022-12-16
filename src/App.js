import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Campuses from './pages/campuses';
import Students from './pages/students';

//main component, the parent of all of the components
function App() {
  //this is making it so that if you go to the /Campuses you'll get campuses and students with the path /students
  return (
    <div>
      <Routes>
        <Route path="/campuses" element={<Campuses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/campuses/:campusId" element={ <Campus />} />
      </Routes>
    </div>
  )
}

export default App;
