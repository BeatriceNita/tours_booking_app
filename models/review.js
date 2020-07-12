const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author:  {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "tours"
    },
    text: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

const Review = mongoose.model("tour_reviews", ReviewSchema);

module.exports = Review;