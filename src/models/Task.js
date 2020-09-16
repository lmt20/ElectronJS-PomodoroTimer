const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isDisplayed: {
        type: Boolean,
        default: true
    },
    completedIntervalNum: {
        type: Number,
        default: 0,
        required: [true, 'completedIntervalNum is required']

    },
    settedIntervalNum: {
        type: Number,
        default: 1,
        required: [true, 'settedIntervalNum is required']
    },
    created: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('task', TaskSchema);