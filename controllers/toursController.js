const Tour = require("../models/tour");
const Review = require("../models/review");
const Rating = require("../models/rating");
const User = require("../models/user");

module.exports = {
    getTours: async (req, res) => {
        const tours = await Tour.find()
        .populate('guide')
        .populate({
            path: 'ratings',
            populate: {
                path: 'author',
                model: 'users'
            }
        })
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author',
                    model: 'users'
                }
            })
        res.status(200).json(tours);
    },

    addTour: async (req, res) => {
        var userId = req.body.user.id;
        const user = await User.findById(userId);

        var city = req.body.tour.city;
        var location_name = req.body.tour.location_name;
        var date = req.body.tour.date;
        var time = req.body.tour.time;
        var services = req.body.tour.services;
        var max_capacity = req.body.tour.max_capacity;
        var price_adult = req.body.tour.price_adult;
        var price_child = req.body.tour.price_child;

        const tour = {
            city: city,
            location_name: location_name,
            date: date,
            time: time,
            services: services,
            max_capacity: max_capacity,
            occupied_spots: 0,
            price_adult: price_adult,
            price_child: price_child
        }

        const addedTour = new Tour(tour);
        addedTour.guide = user;

        const newTour = await addedTour.save();

        res.status(200).json(newTour);
    },

    getTour: async (req, res) => {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json(tour);
    },

    deleteTour: async (req, res) => {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json('Tour deleted');
    },

    editTour: async (req, res) => {
        const tour = await Tour.findById(req.params.id);

        tour.city = req.body.city;
        tour.location_name = req.body.location_name;
        tour.date = req.body.date;
        tour.time = req.body.time;
        tour.services = req.body.services;
        tour.max_capacity = Number(req.body.max_capacity);
        tour.price_adult = Number(req.body.price_adult);
        tour.price_child = Number(req.body.price_child);

        await tour.save()
        res.status(200).json('Tour updated')
    },

    addReview: async (req, res) => {
        const tour = await Tour.findById(req.params.id);

        var userId = req.body.user.id;
        const user = await User.findById(userId);

        const newReview = new Review(req.body.review);
        newReview.tour = tour;
        newReview.author = user;
        await newReview.save();

        tour.reviews.push(newReview);
        await tour.save();

        res.status(200).json(newReview);
    },

    addRating: async (req, res) => {
        const tour = await Tour.findById(req.params.id);

        var userId = req.body.user.id;
        const user = await User.findById(userId);

        const newRating = new Rating(req.body.rating);
        newRating.tour = tour;
        newRating.author = user;
        await newRating.save();

        tour.ratings.push(newRating);
        await tour.save();

        res.status(200).json(newRating);
    }
}