const Location = require("../models/location");

module.exports = {
    getLocations: async (req, res) => {
        const locations = await Location.find();
        res.status(200).json(locations);
    },

    deleteLocation: async (req, res) => {
        await Location.findByIdAndDelete(req.params.id);
        res.status(200).json('Location deleted');
    }
}
