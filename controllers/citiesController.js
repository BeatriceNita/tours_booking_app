const Location = require("../models/location");
const City = require("../models/city");

module.exports = {
    getCities: async (req, res) => {
        const cities = await City.find();
        res.status(200).json(cities);
    },

    addCity: async (req, res) => {
        const newCity = new City(req.body);
        const city = await newCity.save();
        res.status(200).json(city);
    },

    getCity: async (req, res) => {
        const city = await City.findById(req.params.id);
        res.status(200).json(city);
    },

    addLocation: async (req, res) => {
        const city = await City.findById(req.params.id);

        const newLocation = new Location(req.body);
        newLocation.city = city;           //assign the city as the location's specific city
        await newLocation.save();

        city.locations.push(newLocation); //add the new location to the city's locations Array
        await city.save();

        res.status(200).json(newLocation);
    },

    getLocations: async (req, res) => {
        const city = await City.findById(req.params.id).populate('locations');
        res.status(200).json(city.locations);
    },

    deleteCity: async (req, res) => {
        await City.findByIdAndDelete(req.params.id);
        res.status(200).json('City deleted');
    }
}