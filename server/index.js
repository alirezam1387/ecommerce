const express = require('express')
const cors = require('cors')
const MongoDBConnect = require('./src/database/MongoDB')
const ErrorMidlleWere = require('./src/utils/error')
const cookieParser = require('cookie-parser')

const userRouter = require('./src/router/user.routes')
const productRouter = require('./src/router/product.routes')
const orderRouter = require('./src/router/order.routes')

// const multer = require('multer');
// const path = require('path');

require('dotenv').config({
  quiet: true,
})

const server = express()

// cookies
server.use(cookieParser())

server.use(cors())
server.use(express.json({ limit: '12mb' }))
server.use(express.urlencoded({ extended: true, limit: '12mb' }))

// server router setup
server.use('/api/users', userRouter)
server.use('/api/products', productRouter)
server.use('/api/order', orderRouter)

server.use(ErrorMidlleWere)

const PORT = process.env.PORT || 5050 // default port for server is 5050
const MONGO_URI = process.env.MONGO_URI

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  MongoDBConnect(MONGO_URI)
})
