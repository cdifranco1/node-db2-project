const express = require('express')
const carsRoute = require('./cars')
const router = express.Router()

router.use('/cars', carsRoute)

module.exports = router