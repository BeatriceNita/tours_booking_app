const router = require('express-promise-router')();

const citiesController = require('../controllers/citiesController');

router.route('/').get(citiesController.getCities);

router.route('/:id').get(citiesController.getCity)
                    .delete(citiesController.deleteCity);

router.route('/addCity').post(citiesController.addCity);

router.route('/:id/addLocation').post(citiesController.addLocation);

router.route('/getLocations/:id').get(citiesController.getLocations);

module.exports = router;