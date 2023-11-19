const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 9)
const Schema = mongoose.Schema;

// const timeSchema = new Schema()


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        
    },
    // imgName: {
    //     type: String,
        
    // },
    description: {
        type: String,
    },
    role: {
        type: String,
        default: 'Normal'
    },
    speciality: {
        type: String,
        default: 'None'
    },
    experience: {
        type: Number,
    },
    degree: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: Number,
    },
    timing:  {
        timeFrom:  String,
        timeTo:  String
    },
    days: [String],
    // roomId: {
    //     type: String,
    //     unique: true,
    //     default: () => `${nanoid()}`,
    // },
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);