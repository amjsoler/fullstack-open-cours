const express = require('express')
const logger = require('./utils/logger')
const config = require("./utils/config");
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/usersController")

const {requestLogger} = require("./utils/middleware");

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGO_URI)
mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(requestLogger)

//Controllers
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app