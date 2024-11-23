const mongoose = require('mongoose')

const url = process.env.MONGODB_URL


const connectToDB = async ()=>{
        try{
            const result = await mongoose.connect(url)
            if(result){
                 console.log("Connected To Database...")
            }
        }
        catch(err){
             console.log(err.message)
        }
}


module.exports = connectToDB