const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
    tasks: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Task'
        }

    ],
    setting: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'PomoSetting'
    },
    created: {
        type: Date,
        default: Date.now()
    },
})
UserSchema.methods.addTask = function (taskId) {
    this.tasks.push(taskId)
    return this.save();
}
UserSchema.methods.deleteTask = function (taskId) {
    const taskIndex = this.tasks.findIndex(task => {
        return taskId.toString() === task._id.toString();
    })
    this.tasks.splice(taskIndex, 1)
    return this.save();
}
module.exports = mongoose.model('User', UserSchema);