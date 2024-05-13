const { check } = require('express-validator')

const validateApartment = () => {
   return [
      check('rooms', `Rooms must be greater than 0 and only numbers must be used`).isInt({ gt: 0 }),
      check('price', 'The price must be greater than 0 and only numbers must be used').isInt({ gt: 0 }),
      check('name', 'Name length must be greater than 0 and less than 99, only string must be used')
         .isString()
         .isLength({ min: 1, max: 99 }),
      check('description', 'Description length must be greater than 0 and less than 999, only string must be used')
         .isString()
         .isLength({ min: 1, max: 99 }),
   ]
}

module.exports = { validateApartment }
