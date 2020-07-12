const router = require('express-promise-router')();

const toursController = require('../controllers/toursController');

router.route('/').get(toursController.getTours);

router.route('/addTour').post(toursController.addTour);

router.route('/:id')
    .get(toursController.getTour)
    .delete(toursController.deleteTour)
    .post(toursController.editTour)

router.route('/addReview/:id').post(toursController.addReview);

router.route('/addRating/:id').post(toursController.addRating);

module.exports = router