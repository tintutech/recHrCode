const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

// const studentList = [
//     {
//         _id: 1,
//         firstName: 'test',
//         lastName: 'testLast',
//         nationality: 'Indian',
//         dob: '12/12/2222',
//         status: 'pending',
//         family: [{ name: 'family1', nationality: 'Indian', relation: 'sibiling' }]
//     }];

const studentList = [];

app.get('/api/list', (req, res) => {
    res.send(studentList);
})

app.post('/api/add', (req, res) => {
    const { firstName, lastName, nationality, dob, family } = req.body;
    let randomNumber = Math.floor(Math.random() * 1000);
    // studentList.push(req.body);
    studentList.push({
        _id: randomNumber,
        firstName,
        lastName,
        nationality,
        dob,
        family,
        status: 'pending'
    })
    res.send(studentList)
})

app.post('/api/approve', (req, res) => {
    const { studentId } = req.body;
    const student = studentList.filter(item => item._id === studentId);
    if (student && student.length > 0) {
        student[0].status = 'approved';
        res.send(studentList)
    } else {
        res.status(500).send('Invalid student')
    }
})

app.post('/api/update', (req, res) => {
    const { studentId, firstName, lastName, dob, nationality, family } = req.body;
    const student = studentList.filter(item => item._id === studentId);
    if (student && student.length > 0) {
        delete req.body.studentId;
        if (firstName) student[0].firstName = firstName;
        if (lastName) student[0].lastName = lastName;
        if (dob) student[0].dob = dob;
        if (nationality) student[0].nationality = nationality;
        if (family) student[0].family = family;
        res.send(studentList)
    } else {
        res.status(500).send('Invalid student')
    }
})

app.listen(4000, () => {
    console.log('Server running')
})