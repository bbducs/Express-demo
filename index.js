const Joi = require('joi');
const expresss = require('express');
const app = expresss();

app.use(expresss.json());

const courses = [{id: 1, name: "course1" },
    {id: 2, name: "course2" },
    {id: 3, name: "course3" }
];

//SET Rought
app.get('/', (req,res) => {
    res.send("Hello kishan is here");
})

//set rought with get method
app.get('/student', (req,res) => {
    res.send(courses);
})

//post method with Joi
app.post('/student', (req,res) => {
    const Schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, Schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


















app.get('/student/:id', (req,res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) res.status(404).send("id in not found");
   res.send(course);
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));