const Apartment = require('../models/Apartment')
const ApiError = require('../errors/ApiError')
const { validationResult } = require('express-validator')

class apartmentController {
   async getApartments(req, res, next) {
      try {
         const { price, rooms } = req.query

         let query = Apartment.find()

         if (rooms) {
            query = query.where('rooms', rooms)
         }

         if (price === 'asc') {
            query = query.sort('price')
         } else if (price === 'desc') {
            query = query.sort('-price')
         }

         const apartments = await query.exec()

         return res.status(200).json(apartments)
      } catch (e) {
         next(e)
      }
   }

   async getApartmentByid(req, res, next) {
      try {
         const { id } = req.params

         const apartment = await Apartment.findById(id)

         return res.status(200).json(apartment)
      } catch (e) {
         next(e)
      }
   }

   async createApartment(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
         }
         const { rooms, name, price, description } = req.body

         const apartment = new Apartment({
            rooms,
            name,
            price,
            description,
         })

         await apartment.save()

         return res.status(201).json(apartment)
      } catch (e) {
         next(e)
      }
   }

   async editApartment(req, res, next) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Помилка при валідації', errors.array()))
         }
         const { id } = req.params
         const { rooms, name, price, description } = req.body

         const apartment = await Apartment.findById(id)

         if (!apartment) {
            return res.status(404).json({ message: 'Apartment not found' })
         }

         apartment.rooms = rooms
         apartment.name = name
         apartment.price = price
         apartment.description = description

         await apartment.save()

         return res.status(200).json(apartment)
      } catch (e) {
         next(e)
      }
   }

   async deleteApartment(req, res, next) {
      try {
         const { id } = req.params

         await Apartment.deleteOne({ _id: id })

         return res.status(200).json({ message: 'Apartment deleted successfully' })
      } catch (e) {
         next(e)
      }
   }
}

module.exports = new apartmentController()
