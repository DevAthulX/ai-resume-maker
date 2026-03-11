const mongoose = require('mongoose')


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("connected to DB");
        
    }
    catch (err) {
        console.log(err);

    }
}

module.exports = connectDB