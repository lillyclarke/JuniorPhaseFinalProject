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

//post is for creating
app.post('/api/campuses', (req, res, next) => {
  const campus = req.body
  campus.id = campuses.length + 1
  campuses.push(campus)
  res.json(campuses)
});

//route for the students
app.get('/api/students', (req, res, next) => {
  res.json(students) //could also use .send instead of json (depends on what form you want it in)
});

//route for campus
app.get('/api/campuses', (req, res, next) => {
  res.json(campuses)
});

//this student belongs to this campus(id), students can only be associated with one campus //so whatever id is in the url it'll be this
app.get("/api/campuses/:campusId", (req, res, next) => {
  const campusId = req.params.campusId;
  const campus = campuses.find((campus) => campus.id === +campusId); //+ sign converts the string to an integer
  campus.students = students.filter( //adding a new property to it so it also shows the student info
    (student) => student.campusId === +campusId
  );
  res.json(campus);
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
