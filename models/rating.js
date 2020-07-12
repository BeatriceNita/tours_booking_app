const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "tours"
    },
    value: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    });

const Rating = mongoose.model("tour_ratings", RatingSchema);

module.exports = Rating;