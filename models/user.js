const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "bookings"
    }]
},
    {
        timestamps: true,
    });

const User = mongoose.model("users", UserSchema);

module.exports = User;