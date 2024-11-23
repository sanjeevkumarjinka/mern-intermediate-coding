const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3002
const connectToDB = require('./database/db')
const allRoutes = require('./routes/route')

connectToDB()

app.use(cors({
      origin:"*"
}))

app.use(express.json())
app.use('/api' , allRoutes)


app.get('/' , (req,res)=>{
      res.status(201).json({message:"Normal route Mern-intermediate"})
})



app.listen(port , ()=>{
      console.log(`server is running on ${port}`)
})