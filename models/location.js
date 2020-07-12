const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    location_name: {
        type: String, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "cities"
    }
});

const Location = mongoose.model("locations", LocationSchema);

module.exports = Location;