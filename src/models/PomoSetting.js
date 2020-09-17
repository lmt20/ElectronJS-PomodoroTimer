const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PomoSettingSchema = new Schema({
    pomoTime: {
        type: Number,
        default: 25,
        required: [true, 'PomoTime is required']
    },
    shortBreakTime: {
        type: Number,
        default: 5,
        required: [true, 'ShortBreakTime is required']
    },
    longBreakTime: {
        type: Number,
        default: 15,
        required: [true, 'LongBreakTime is required']
    },
    longBreakInterval: {
        type: Number,
        default: 3,
        required: [true, 'LongBreakInterval is required']
    },
    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Pomosetting', PomoSettingSchema);