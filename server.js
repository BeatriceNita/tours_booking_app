const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const cities = require("./routes/cities");
const locations = require("./routes/locations");
const tours = require("./routes/tours");
const bookings = require("./routes/bookings");

//bodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//DB configuration
const uri = require("./config/keys").mongoURI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

require("./config/passport")(passport);

//Routes
app.use("/users", users);
app.use("/cities", cities);
app.use("/locations", locations);
app.use("/tours", tours);
app.use("/bookings", bookings);

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));