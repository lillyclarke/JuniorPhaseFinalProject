const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');
const { library } = require('webpack');
const { json } = require('sequelize');
const app = express();

//static middleware
app.use(express.static(path.join(__dirname, '..','public')))

app.use(cors())
app.use(volleyball)

app.use(express.json())

//route for the students
app.get('/api/students', (req, res, next) => {
  res.json(students); //could also use .send instead of json (depends on what form you want it in)
});

//route for campus
app.get('/api/campuses', (req, res, next) => {
  res.json(campuses);
});

//this student belongs to this campus(id), students can only be associated with one campus //so whatever id is in the url it'll be this
app.get('/api/campuses/:campusId', (req, res, next) => {
  const campusId = req.params.campusId;
  let campus = campuses.find((campus) => campus.id === +campusId); //+ sign converts the string to an integer //had to change to let due to the copy of the array(line below)
  campus = {...campus} //creates a copy of the campus to not alter previous array
  campus.students = students.filter( //adding a new property to it so it also shows the student info
    (student) => student.campusId === +campusId
  );
  res.json(campus);
});

app.get('/api/students/:studentId', (req, res, next) => {
  const studentId = req.params.studentId
  let student = students.find((student) => student.id === +studentId)
  student = {...student}
  student.campus = campuses.find((campus) => campus.id === student.campusId)
  res.json(student);
});


//post is for creating, used for creating a campus
app.post('/api/campuses', (req, res, next) => {
  const campus = req.body
  campus.id = campuses.length + 1
  campuses.push(campus)
  res.json(campuses);
});

//add student
app.post('api/students', (req, res, next) => {
  const student = req.body
  student.id = students.length + 1
  students.push(student)
  res.json(students);
});

//updating students
app.put('/api/students/:studentId', (req, res, next) => {
  const studentId = req.params.studentId
  let student = students.find((student) => student.id === +studentId) //find a student
  student = {...student, ...req.body} //set a student
  student.campus = campuses.find((campus) => campus.id === student.campusId)
  res.json(students);
});

//updating campus
app.put('/api/campuses/:campusId', (req, res, next) => {
  const campusId = req.params.campusId
  let campus = campuses.find((campus) => campus.id === +campusId)
  campus = {...campus, ...req.body}
  campus.students = students.filter( //adding a new property to it so it also shows the student info
    (student) => student.campusId === +campusId
  );
  res.json(campuses);
});

//deleting a campus
app.delete('/api/campuses/:campusId', (req, res, next) => {
  const campusId = req.params.campusId
  const campus = campuses.find((campus) => campus.id === +campusId) //finding a campus with this id, this is what it'll delete
  const index = campuses.indecOf(campus)
  campuses.splice(index, 1) //1 means it'll remove one campus
  res.json(campuses); //this'll return an array of campuses
});

//delete student
app.delete('/api/students/:studentId', (req, res, next) => {
  const studentId = req.params.studentId
  const student = students.find((student) => student.id === +studentId)
  const index = students.indexOf(student)
  students.splice(index, 1)
  res.json(students);
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
