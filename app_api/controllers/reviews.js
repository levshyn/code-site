var mongoose = require('mongoose');
// var Loc = require('../models/locations');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// Getting single review
module.exports.reviewsReadOne = function(req, res) {
    // Verify that reviewid exists as a parameter
    if (req.params && req.params.locationid && req.params.reviewid) {
        console.log("reviewsReadOne(), req.params.locationid:");
        console.log(req.params.locationid);
        Loc
        .findById(req.params.locationid)
        // Add Mongoose select method to model query, stating that we
        // want to get name of location and its reviews
        .select('name reviews')
        .exec(function(err, location) {
            var response, review;
            console.log("reviewsReadOne(), location:");
            console.log(location);
            if (!location) {
                sendJSONresponse(res, 404, {
                "message": "locationid not found"
                });
                return;
            } else if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }
            console.log('location answer:')
            console.log(location);
            // Check that returned location has reviews
            if (location.reviews && location.reviews.length > 0) {
                console.log('answer reviewid:');
                console.log(req.params.reviewid);
                // Use Mongoose subdocument .id method as a helper for searching for matching ID
                review = location.reviews.id(req.params.reviewid);
                console.log('answer review:');
                console.log(review);
                // If review isn’t found return an appropriate response
                if (!review) {
                    sendJSONresponse(res, 404, {
                        "message": "reviewid not found"
                    });
                // If review is found build response object returning review and location name and ID
                } else {
                    response = {
                        location : {
                            name : location.name,
                            id : req.params.locationid
                        },
                        review : review
                    };
                    sendJSONresponse(res, 200, response);
                }
            // If no reviews are found return an appropriate error message
            } else {
                sendJSONresponse(res, 404, {
                    "message": "No reviews found"
                });
            }
        });
    } else {
        sendJSONresponse(res, 404, {
            "message": "Not found, locationid and reviewid are both required"
        });
    }
};

module.exports.reviewsCreate = function (req, res) { };