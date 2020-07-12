const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    location_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guide: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    services: {
        type: String,
        required: true
    },
    max_capacity: {
        type: Number,
        required: true
    },
    occupied_spots: {
        type: Number,
        required: true
    },
    price_adult: {
        type: Number,
        required: true
    },
    price_child: {
        type: Number,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "tour_reviews"
    }],
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: "tour_ratings"
    }]
});

const Tour = mongoose.model("tours", TourSchema);

module.exports = Tour;