var mongoose = require('mongoose');
// require('../models/snippets');
var Loc = require('../models/snippets');
//var Loc = mongoose.model('Snippet');

// New utility function that accepts response object, a status code, and a data object
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function(req, res) {
    sendJSONresponse(res, 200, { "status": "successPost" });
};

module.exports.snippetsList = function(req, res) {
    console.log('Finding code snippets details, req.params', req.params);
    console.log('req.query', req.query);
    let query = {};
    if (req.query) {
        Object.keys(req.query).forEach(keyQuery => {
            // Try-catch surrounds the loop to allow throwing the breakException as an equivalent
            // for breaking out of the loop.
            let breakException = {};
            try {
                // Loc.mongooseModel.schema.paths - properties of snippetSchema from ../models/snippets
                Object.keys(Loc.mongooseModel.schema.paths).forEach(keySchema => {
                    if (keySchema == keyQuery) {
                        query[keyQuery] = req.query[keyQuery];
                        // console.log(keyQuery + ':' + req.query[keyQuery]);
                        throw breakException;
                    };
                });

            } catch (error) {
                // If the error thrown was not the breakException, allow the error to continue up the
                // stack.
                if (error !== breakException) throw error;
            }
        });
        console.log('query after forEach:');
        console.log(query);
    }

    Loc.mongooseModel
        .find(query)
        .exec(function(err, snippet) {
            sendJSONresponse(res, 200, snippet);
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


module.exports.snippetsReadOne = function(req, res) {
    console.log('Finding code snippet details', req.params);
    if (req.params && req.params.id) {
        Loc.mongooseModel
            .findOne({ id: req.params.id })
            .select('id thema title method language lib codeSnippet link visible text codeTitle')
            .exec(function(err, snippet) {
                if (!snippet) {
                    sendJSONresponse(res, 404, {
                        "message": "code snippet not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(snippet);
                sendJSONresponse(res, 200, snippet);
            });
    } else {
        console.log('No id of code snippet specified');
        sendJSONresponse(res, 404, {
            "message": "No id of code snippet in request"
        });
    }
};