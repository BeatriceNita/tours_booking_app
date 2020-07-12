const Booking = require("../models/booking");
const User = require("../models/user");
const Tour = require("../models/tour");

module.exports = {
    getBookings: async (req, res) => {
        bookings = await Booking.find();
        res.status(200).json(bookings);
    },

    deleteBooking: async (req, res) => {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json('Booking deleted');
    },

    getBookingsForUser: async (req, res) => {
        const user = await User.findById(req.params.id)
            .populate({
                path: 'bookings',
                populate: {
                    path: 'tour',
                    model: 'tours'
                }
            })
        res.status(200).json(user.bookings)
    },

    addBooking: async (req, res) => {
        var userId = req.body.user.id;
        const user = await User.findById(userId);

        var tourId = req.body.tour_id;
        const tour = await Tour.findById(tourId);

        var price_adult = tour.price_adult;
        var price_child = tour.price_child;

        var nr_tickets_adult = Number(req.body.booking.nr_tickets_adult)
        var nr_tickets_child = Number(req.body.booking.nr_tickets_child)

        var total_amount = nr_tickets_adult * price_adult + nr_tickets_child * price_child;

        var occupied_spots = tour.occupied_spots;
        var max_capacity = tour.max_capacity;

        var c = occupied_spots + nr_tickets_adult + nr_tickets_child;

        const booking = {
            nr_tickets_adult: nr_tickets_adult,
            nr_tickets_child: nr_tickets_child,
            total_sum: total_amount
        }

        if (c > max_capacity) {
            res.status(400).send(
              "There are not enough spots available!"
            );
        } else {
            const newBooking = new Booking(booking);

            tour.occupied_spots += nr_tickets_adult + nr_tickets_child;
            await tour.save();

            newBooking.user = user;
            newBooking.tour = tour;
            await newBooking.save();

            user.bookings.push(newBooking);
            await user.save();

            res.status(200).json(newBooking);
        }
    }
}