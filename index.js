const Joi = require('joi');
const express = require('express');
const geners = require('./Route/myRoute')
const app = express();

app.use(express.json());
app.use('/student', geners);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));