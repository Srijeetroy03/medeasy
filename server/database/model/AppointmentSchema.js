const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./UserSchema');

const appointmentSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    // date: {
    //     type: Date,
    //     required: true
    // },
    day: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
},{timestamps:true})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;