const router = require('express-promise-router')();

const locationsController = require('../controllers/locationsController');

router.route('/').get(locationsController.getLocations);

router.route('/:id').delete(locationsController.deleteLocation);

module.exports = router;