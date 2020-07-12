const router = require('express-promise-router')();

const bookingsController = require('../controllers/bookingsController');

router.route('/').get(bookingsController.getBookings);
                 
router.route('/:id').delete(bookingsController.deleteBooking);

router.route('/addBooking').post(bookingsController.addBooking);

router.route('/getBookings/:id').get(bookingsController.getBookingsForUser);

module.exports = router;