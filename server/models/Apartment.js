const { Schema, model } = require('mongoose')

const Apartment = new Schema({
   rooms: { type: Number, required: true },
   name: { type: String, required: true },
   price: { type: Number, required: true },
   description: { type: String, required: true },
})

module.exports = model('Apartment', Apartment)
