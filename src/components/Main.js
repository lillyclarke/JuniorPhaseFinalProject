import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Campuses from './pages/Campuses';
import Students from './pages/Students';
import Campus from './pages/Campus';
import Student from './pages/Student';
import AddCampus from './pages/AddCampus';
import AddStudent from './pages/AddStudent';
import EditCampus from './pages/EditCampus';
import EditStudent from './pages/EditStudent';
import DeleteCampus from './pages/DeleteCampus';
import DeleteStudent from './pages/DeleteStudent';
import NotFound from './pages/NotFound';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/campuses" element={<Campuses />} />
                <Route path="/students" element={<Students />} />
                <Route path="/campuses/:campusId" element={<Campus />} />
                <Route path="/students/:studentId" element={<Student />} />
                <Route path="/add-campus" element={<AddCampus />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/edit-campus/:campusId" element={<EditCampus />} />
                <Route path="/edit-student/:studentId" element={<EditStudent />} />
                <Route path="/delete-campus/:campusId" element={<DeleteCampus />} />
                <Route path="/delete-student/:studentId" element={<DeleteStudent />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
};

const Main = () => {
    return (
        <div>
        </div>
    )
};

export default Main;
