const express = require('express');
const { getPeople, getPeopleById, createPeople, updatePeople, deletePeople } =  require('../services/peopleService')

const router = express.Router();

router.get('/people', getPeople);
router.get('/people/:id', getPeopleById);
router.post('/people', createPeople);
router.put('/people/:id', updatePeople);
router.delete('/people/:id', deletePeople);

module.exports = router