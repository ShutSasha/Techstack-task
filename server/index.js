require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
@cluster0.kkbcyfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const app = express()
app.use(express.json())
app.use(
   cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
   }),
)
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
   try {
      await mongoose.connect(uri)

      app.listen(PORT, () => {
         console.log(`Server started on PORT ${PORT}`)
      })
   } catch (error) {
      console.error('Error:', error)
   }
}

start()
