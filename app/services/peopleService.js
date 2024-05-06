const fs = require('fs');

const people = require('../models/people')

const writePeople = () => {
    fs.writeFileSync('people.json', JSON.stringify(people), 'utf8');
}

const getPeople = (req, res) => {
    const { username } = req.query;

    if (username) {
        fs.readFile('people.json', 'utf8', (err, data) => {
            if (err) console.log('Error reading data!');

            const dataFind = JSON.parse(data).filter(person => person.username.toLowerCase().includes(username.toLowerCase()))
            res.type('json').end(JSON.stringify(dataFind));
        })
    } else {
        fs.readFile('people.json', 'utf8', (err, data) => {
            if (err) console.log('Error reading data!');

            res.type('json').end(data)
        })
    }
}

const getPeopleById = (req, res) => {
    const id = Number(req.params.id);

    fs.readFile('people.json', 'utf8', (err, data) => {
        if (err) console.log('Error reading data!');

        const dataFind = JSON.parse(data).find(person => person.id === id)
        res.type('json').end(JSON.stringify(dataFind));
    })
}

const createPeople = (req, res) => {
    const { name, username, email } = req.body;

    fs.readFile('people.json', 'utf8', (err, data) => {
        if (err) console.log('Error reading data!');

        const parsedData = JSON.parse(data)
        const payload = { id: parsedData[parsedData.length - 1].id + 1, name: name, username: username, email: email}
        parsedData.push(payload);

        fs.writeFileSync('people.json', JSON.stringify(parsedData), 'utf8');
        res.type('json').end("Data success to create");
    })
}

const updatePeople = (req, res) => {
    const id = Number(req.params.id);
    const { name, username, email } = req.body;

    fs.readFile('people.json', 'utf8', (err, data) => {
        if (err) console.log('Error reading data!');

        const parsedData = JSON.parse(data)
        const index = parsedData.findIndex(person => person.id === id)
        const payload = { id, name, username, email }
        parsedData[index] = { ...parsedData[index], ...payload };

        fs.writeFileSync('people.json', JSON.stringify(parsedData), 'utf8');
        res.type('json').end("Data success to update");
    })
}

const deletePeople = (req, res) => {
    const id = Number(req.params.id);

    fs.readFile('people.json', 'utf8', (err, data) => {
        if (err) console.log('Error reading data!');

        const parsedData = JSON.parse(data)
        const index = parsedData.findIndex(person => person.id === id)
        parsedData.splice(index, 1);

        fs.writeFileSync('people.json', JSON.stringify(parsedData), 'utf8');
        res.type('json').end("Data success to delete");
    })
}

module.exports = { writePeople, getPeople, getPeopleById, createPeople, updatePeople, deletePeople }