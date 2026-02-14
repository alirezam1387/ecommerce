const express = require('express')
const cors = require('cors')
const userRouter = require('./src/router/user.routes')
const MongoDBConnect = require('./src/database/MongoDB')
const ErrorMidlleWere = require('./src/utils/error')
const cookieParser = require('cookie-parser')
const productRouter = require('./src/router/product.router')
require('dotenv').config({
  quiet: true,
})

const server = express()

// cookies
server.use(cookieParser())

server.use(cors())
server.use(express.json());

// server router setup
server.use('/api/user', userRouter)
server.use('', productRouter)
server.use(ErrorMidlleWere)

const PORT = process.env.PORT || 5050 // default port for server is 5050
const MONGO_URI = process.env.MONGO_URI

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  MongoDBConnect(MONGO_URI)
})
