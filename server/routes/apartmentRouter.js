const Router = require('express')
const router = new Router()
const apartmentAnimeController = require('../controllers/apartmentController')
const { validateApartment } = require('../validators/apartment')

router.get('/', apartmentAnimeController.getApartments)
router.get('/:id', apartmentAnimeController.getApartmentByid)
router.post('/', validateApartment(), apartmentAnimeController.createApartment)
router.put('/:id', apartmentAnimeController.editApartment)
router.delete('/:id', apartmentAnimeController.deleteApartment)

module.exports = router
