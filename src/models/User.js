const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchma = new Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, 'Username is required']
    },
    mail: {
        type: String,
        trim: true,
        required: [true, 'Mail is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required']
    },
    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('user', UserSchma);