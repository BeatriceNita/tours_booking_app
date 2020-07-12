const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "tours"
    },
    nr_tickets_adult: {
        type: Number,
        required: true
    },
    nr_tickets_child: {
        type: Number,
        required: true
    },
    total_sum: {
        type: Number,
        required: true
    }
});

const Booking = mongoose.model("bookings", BookingSchema);

module.exports = Booking;