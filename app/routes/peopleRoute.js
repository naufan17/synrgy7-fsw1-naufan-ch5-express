const express = require('express');
const multer = require('multer'); 
const { getPeople, getPeopleById, createPeople, updatePeople, deletePeople, uploadImagePeople } =  require('../services/peopleService')

const router = express.Router();
const uploadImage = multer({ dest: 'public/images/' });

router.get('/people', getPeople);
router.get('/people/:id', getPeopleById);
router.post('/people', createPeople);
router.put('/people/:id', updatePeople);
router.delete('/people/:id', deletePeople);
router.post('/people/image', uploadImage.single('image'), uploadImagePeople)

module.exports = router