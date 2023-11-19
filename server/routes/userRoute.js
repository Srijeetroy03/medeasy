const express = require('express');
const {registerUser, loginUser, updateUser, getUsers, validate, getDoctors, getDoctorsBySpeciality, getDoctorById} = require('../controllers/userController');

const router = express.Router();

const User = require('../database/model/UserSchema');

router.post('/validate', (req, res) => validate(req, res));

router.post('/register', (req, res) => registerUser(req, res));

router.post('/update', (req, res) => updateUser(req, res));

router.post('/login', (req,res)=>loginUser(req,res))

router.get('/', (req,res)=>getUsers(req,res))

router.get('/doctor', (req,res)=>getDoctors(req,res))

router.post('/doctor', (req,res)=>getDoctorsBySpeciality(req,res))

router.get('/doctor/:id', (req,res)=>getDoctorById(req,res))

module.exports = router;