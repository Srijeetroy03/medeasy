const express = require('express');

const router = express.Router();

const Appointment = require('../database/model/AppointmentSchema');

router.post('/add',async (req,res)=>{
    console.log('adding');
    try{
        console.log(req.body);
        const check = await Appointment.findOne(req.body)
        console.log(check);
        if(check){
            throw new Error('Appointment already exists')
        }
        const appointment = await Appointment.create(req.body)
        appointment.populate('doctor')
        appointment.populate('patient')
        appointment.save()
        console.log(appointment);
        res.status(200).json(appointment._doc)
    }
    catch(err){
        res.status(400).json({message: err.message})
        console.log('Err:',err);
    }
})


router.get('/:role/:id',async (req,res)=>{
    try{
        const {role,id} = req.params
        const appointments = await Appointment.find(role === 'Doctor' ? {doctor: id} : {patient: id}).populate(role==='Doctor' ? 'patient' : 'doctor',{password: 0})
        console.log(appointments);
        res.status(200).json(appointments)
    }
    catch(err){
        res.status(400).json({message: err.message})
        console.log('Err:',err);
    }
})
module.exports = router;