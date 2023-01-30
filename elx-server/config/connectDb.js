const mongoose = require('mongoose')
require('dotenv').config();
const dbConnectionString = process.env.MONGO_LOCAL_URI
mongoose.set('strictQuery', true);

const dbConnectinMethod = async () => {
    console.log(dbConnectionString)
    try {
        await mongoose.connect(dbConnectionString)
        console.log("Db connected")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { dbConnectinMethod }