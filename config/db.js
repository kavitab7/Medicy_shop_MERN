const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
        console.log('connected to mongodb ');
    } catch (err) {
        console.log(err)
    }
}
module.export = connectDB();