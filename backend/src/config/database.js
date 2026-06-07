const mongoose = require('mongoose');

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'interview-master',
            family: 4
        })
        .then(() => console.log("🚀 MongoDB Connected Successfully!"))
        .catch((err) => console.error("❌ MongoDB Connection Error:", err));

        //console.log('Connected to database');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectToDB;