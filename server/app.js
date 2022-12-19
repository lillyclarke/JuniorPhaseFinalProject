const express = require('express');
const path = require('path');
const id = require('volleyball/lib/id');
const cors = require('cors');
const volleyball = require('volleyball');
const { library } = require('webpack');
const { json } = require('sequelize');
const app = express();

//dummy data for students and campuses
const students = [
  {id: 1, firstName: 'joe'
  , lastName: 'smith'
  , email: 'JoeSmith@gmail.com'
  , gpa: 3.5
  , imageUrl: 'https://binged.it/3FSrqTO'
  , campusId: 1},
  {id: 2, firstName: 'jane'
  , lastName: 'cook'
  , email: 'cookjand@gmail.com'
  , gpa: 3.5
  , imageUrl: 'https://binged.it/3FSrqTO'
  , campusId: 1},
  {id: 3, firstName: 'jake'
  , lastName: 'smith'
  , email: 'jakesmith@yahoo.com'
  , gpa: 3.5
  , imageUrl: 'https://binged.it/3FSrqTO'
  , campusId: 1},
  {id: 4, firstName: 'jill'
  , lastName: 'lopez'
  , email: 'JillLopez@yahoo.com'
  , gpa: 3.5
  , imageUrl: 'https://binged.it/3FSrqTO'
  , campusId: 1},
  {id: 5, firstName: 'jake'
  , lastName: 'truck'
  , email: 'JakeTruck@gmail '
  , gpa: 3.5
  , imageUrl: 'https://binged.it/3FSrqTO'
  , campusId: 1},
  {id: 6, firstName: 'josh'
  , lastName: 'murray'
  , email: 'joshMurray@yahoo.com'
  , gpa: 3.5
  , imageUrl: 'https://binged.it/3FSrqTO'
  , campusId: 1}
]

const campuses = [
  {id: 1, name: 'mathcollege'
, imageUrl: 'https://binged.it/3FSrqTO'
, address: '123 cool st'
, description: 'mathcollege'},
  {id: 2, name: 'historycollege'
, imageUrl: 'https://binged.it/3FSrqTO'
, address: '123 cool st'
, description: 'historycollege'},
  {id: 3, name: 'englishcollege'
, imageUrl: 'https://binged.it/3FSrqTO'
, address: '123 cool st'
, description: 'englishcollege'},
  {id: 4, name: 'sciencecollege'
, imageUrl: 'https://binged.it/3FSrqTO'
, address: '123 cool st'
, description: 'sciencecollege'},
  {id: 5, name: 'artcollege'
, imageUrl: 'https://binged.it/3FSrqTO'
, address: '123 cool st'
, description: 'artcollege'},
  {id: 6, name: 'musiccollege'
, imageUrl: 'https://binged.it/3FSrqTO'
, address: '123 cool st'
, description: 'musiccollege'}
];


//static middleware
app.use(express.static(path.join(__dirname, '..','public')))

app.use(cors())
app.use(volleyball)

app.use(express.json())

  //routes -----------------------------------------------------------------------------------------------------------------------------------------------------------------
//route for the students
app.get('/api/students', async (req, res, next) => {
  try{
    let studentsCopy = students.map((student) => {
    student = {...student}
    student.campus = campuses.find((campus) => campus.id === student.campusId)
    return student
  })
  res.json(studentsCopy); //could also use .send instead of json (depends on what form you want it in)
  }catch(err){
    next(err);
  }
});

//route for campus
app.get('/api/campuses', (req, res, next) => {
  res.json(campuses);
});

//this student belongs to this campus(id), students can only be associated with one campus //so whatever id is in the url it'll be this
app.get('/api/campuses/:campusId', async (req, res, next) => {
  try{
    const campusId = req.params.campusId;
    let campus = campuses.find((campus) => campus.id === +campusId) //+ sign converts the string to an integer //had to change to let due to the copy of the array(line below)
    campus = {...campus} //creates a copy of the campus to not alter previous array
    campus.students = students.filter((student) => student.campusId === +campusId) //adding a new property to it so it also shows the student info
    res.json(campus);
  }catch(err){
    next(err);
  }
});

app.get('/api/students/:studentId', async (req, res, next) => {
  try{
    const studentId = req.params.studentId
    let student = students.find((student) => student.id === +studentId)
    student = {...student}
    student.campus = campuses.find((campus) => campus.id === student.campusId)
    res.json(student);
  }catch(err){
    next(err);
  }
});

app.get('/api/campuses/numberOfStudents', async (req, res, next) => {
  try{
    let campusesCopy = campuses.map((campus) => { //had to change to let due to the copy of the array(line below)
    campus = {...campus}
     campus.students = students.filter((student) => student.campusId === campus.id)
    return campus
  })
    campusesCopy.sort((a, b) => b.students.length - a.students.length) //sorts the campuses by the number of students
    res.json(campusesCopy);
  }catch(err){
    next(err);
  }
});

app.get('/api/campuses/empty', async (req, res, next) => {
  try{
    let emptyCampuses = campuses.filter((campus) => {
      let campusStudents = students.filter((student) => student.campusId === campus.id)
    return campusStudents.length === 0
  })
    res.json(emptyCampuses);
}catch(err){
  next(err);
}
});

  //post ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//post is for creating, used for creating a campus
app.post('/api/campuses', async (req, res, next) => {
  try{
    const campus = req.body
    campus.id = campuses.length + 1
    campuses.push(campus)
    res.json(campuses);
  }catch(err){
    next(err);
  }
});

//add student
app.post('api/students', async (req, res, next) => {
  try{
    const student = req.body
    student.id = students.length + 1
    students.push(student)
    res.json(students);
  }catch(err){
    next(err);
  }
});

  //put -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//updating students
app.put('/api/students/:studentId', async (req, res, next) => {
  try{
    const studentId = req.params.studentId
    let student = students.find((student) => student.id === +studentId) //find a student
    student.firstName=req.body.firstName
    student.lastName=req.body.lastName
    student.email=req.body.email
    student.gpa=req.body.gpa
    student.campusId=req.body.campusId
    let studentCopy = {...student} //set a student
    studentCopy.campus = campuses.find((campus) => campus.id === student.campusId)
    res.json(studentCopy);
  }catch(err){
    next(err);
  }
});

//updating campus
app.put('/api/campuses/:campusId', async (req, res, next) => {
  try{
    const campusId = req.params.campusId
    let campus = campuses.find((campus) => campus.id === +campusId)
    campus.name = req.body.name
    campus.imageUrl = req.body.imageUrl
    campus.address = req.body.address
    campus.description = req.body.description
    let campusCopy = {...campus}
    campusCopy.students = students.filter(
      (student) => student.campusId === +campusId)
    res.json(campusCopy);
  }catch(err){
    next(err);
  }
});

  //delete -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//deleting a campus
app.delete('/api/campuses/:campusId', async (req, res, next) => {
  try{
    const campusId = req.params.campusId
    const campus = campuses.find((campus) => campus.id === +campusId) //finding a campus with this id, this is what it'll delete
    const index = campuses.indexOf(campus)
    campuses.splice(index, 1) //1 means it'll remove one campus
    res.json(campuses); //this'll return an array of campuses
  }catch(err){
    next(err);
  }
});

//delete student
app.delete('/api/students/:studentId', async (req, res, next) => {
  try{
    const studentId = req.params.studentId
    const student = students.find((student) => student.id === +studentId)
    const index = students.indexOf(student)
    students.splice(index, 1)
    res.json(students);
  }catch(err){
    next(err);
  }
});

//combining two delete routes
app.delete('/api/campuses/:campusId/students/:studentId', async (req, res, next) => {
  try{
    const studentId = req.params.studentId
    const student = students.find((student) => student.id === +studentId) //finding a student with this id, this is what it'll delete
    student.campusId = null
    const campusId = req.params.campusId
    let campus = campuses.find((campus) => campus.id === +campusId)
    campus = {...campus} //copying the campus
    campus.students = students.filter( (student) => student.campusId === +campusId) //returns students with campus id
    res.json(campus);
  }catch(err){
    next(err);
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
