//will set up actual routes here for cars db
const express = require('express')
const knex = require('knex')
const knexfile = require('../knexfile')
const dbCars = knex(knexfile.development)


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cars = await dbCars('cars')
    res.status(200).json(cars)
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const car = await dbCars('cars').where({id: id}).first()
    if (!car){
      res.status(404).json({ message: 'Invalid ID.'})
    } else {
      res.status(200).json(car)
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

router.post('/', validatePostBody, async (req, res) => {
  try {
    const id = await dbCars('cars').insert(req.body)
    const addedCar = await dbCars('cars').where({id: id[0]}).first()
    if (!addedCar){
      res.status(404).json({ message: 'Invalid ID.'})
    } else {
      res.status(201).json(addedCar)
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await dbCars('cars').where({id: id[0]}).first()
    const count = await dbCars('cars').where({id: id[0]}).del()
    if (count > 0){
      res.status(200).json(deleted)
    } else {
      res.status(404).json({ message: 'Car with specified ID not found.'})
    }
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});


//middleware

function validatePostBody(req, res, next){
  if (!req.body){
    res.status(400).json({ message: "Please provide a car request body."})
  } else if (!req.body.vin || !req.body.make || !req.body.model){
    res.status(400).json({ message: "VIN, Make, and Model required."})
  } else {
    next()
  }
}



module.exports = router

