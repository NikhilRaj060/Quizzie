const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nikhilraj2061:nikhil300106@clustor0.8fyx02h.mongodb.net/Quizzie');
        // await mongoose.connect(process.env.URI);
        console.log("Db connected Sucessfully")
    } catch (error) {
        console.log(`Db failed to connect ${error}`)
    }
}

module.exports = connectDB;