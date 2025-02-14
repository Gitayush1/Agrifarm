const mongoose = require('mongoose');
const getConnection =()=>{
    try{
        mongoose.connect(process.env.MONGO_URI).then((connection)=>{
            console.log("DataBase connected successfully");
        }).catch((error)=>{
            console.log("Failed to connect  and the error message is ",error.message);
        })
    } catch(error){
        console.log(error.message);
    }
};

module.exports = getConnection