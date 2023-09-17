const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config();
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')



//connect to db 
mongoose.connect(process.env.DATABASE)
.then(()=> console.log('DB connected'))
.catch(err => console.log('DB connection error',err))



//app middleware
app.use(morgan('dev'))
app.use(express.json())


//middleware
 app.use('/api',authRoutes);
 app.use('/api', taskRoutes)

const port = process.env.PORT || 8000

app.listen(port ,()=>{
    console.log(`Api is running on ${port}`)
})