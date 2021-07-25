const mongoose = require('mongoose');
const { MONGO_URL } = require('./../config');

const connectToDB = async () => {
    try{
        await mongoose.connect(MONGO_URL, {
          useNewUrlParser: true
        });
        console.log("MongoDB Connected.....");
        console.log("Starting Server");

    }catch(err){
        console.error(err.message);
        process.exit(1);

    }
};

module.exports = connectToDB;