// Require Mongoose so that we can use its methods
var mongoose = require('mongoose');

// Without this is: (node:13828) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own
//  promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

// Define a schema for reviews
var reviewSchema = new mongoose.Schema({
    author: String,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: String,
    createdOn: { type: Date, default: Date.now }
});

// Define a schema for opening times
var openingTimeSchema = new mongoose.Schema({
    days: { type: String, required: true },
    opening: String,
    closing: String,
    closed: { type: Boolean, required: true }
});

// Start main location schema definition
var locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    // Use 2dsphere to add support for GeoJSON longitude and latitude coordinate pairs
    rating: { type: Number, "default": 0, min: 0, max: 5 },
    facilities: [String],
    coords: { type: [Number], index: '2dsphere' },
    // Reference opening times and reviews schemas to add nested subdocuments
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

module.exports.mongooseModel = mongoose.model('Location', locationSchema);
