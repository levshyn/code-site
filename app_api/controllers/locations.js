var mongoose = require('mongoose');
// require('../models/locations');
var Loc = require('../models/locations');
//var Loc = mongoose.model('Location');

// New utility function that accepts response object, a status code, and a data object
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "successPost"});
};

module.exports.locationsListByDistance = function (req, res) {
    Loc.mongooseModel
        .find()
        .exec(function(err, location) {
            sendJSONresponse(res, 200, location);
        });
};

/* GET a location by the id */
/*module.exports.locationsReadOne = function(req, res) {
  console.log('Finding location details', req.params);
  if (req.params && req.params.locationid) {
    Loc.mongooseModel
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};*/

/*
module.exports.locationsReadOne = function(req, res) {
  console.log('Finding name details', req.params);
  if (req.params && req.params.name) {
    Loc.mongooseModel
      .findOne({name : req.params.name}, function(err, name) {
        if (!name) {
          sendJSONresponse(res, 404, {
            "message": "name not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(name);
        sendJSONresponse(res, 200, name);
      });
      // .exec();
  } else {
    console.log('No name specified');
    sendJSONresponse(res, 404, {
      "message": "No name in request"
    });
  }
};
*/


module.exports.locationsReadOne = function(req, res) {
  console.log('Finding location details', req.params);
  if (req.params && req.params.name) {
    Loc.mongooseModel
      .find({name : req.params.name})
      .select('name address')
      .exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "name not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
  } else {
    console.log('No name specified');
    sendJSONresponse(res, 404, {
      "message": "No name in request"
    });
  }
};

