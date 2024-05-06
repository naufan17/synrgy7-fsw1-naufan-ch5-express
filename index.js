// const http = require('http');
const express = require('express');
const peopleRoute =  require('./app/routes/peopleRoute')

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(peopleRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});