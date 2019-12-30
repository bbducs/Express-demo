const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' }
];

router.get('/', (req,res) => {
    res.send(courses);
})

router.get('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send("id in not found");
    res.send(course);
 })

router.post('/', (req,res) => {
    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    course.name = req.body.name;
    res.send(courses);
});

function validateCourse(course){
    const Schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, Schema);
}

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("id in not found");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

module.exports = router;