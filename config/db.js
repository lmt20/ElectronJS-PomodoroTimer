const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://lmtruong1512:lmtruong1512@cluster0.lhnzg.mongodb.net/pomodoro?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology : true,
        })
        console.log('Mongoose connected to pomodoro database!')
    } catch (error) {
        console.log(error);
        // process.exit(1);
    }
}

module.exports = connectDB;