var mongoose = require( 'mongoose' );
// Logger
const log = require('../../libs/log')(module);
// For SIGINT on Windows
var readLine = require ("readline");

var gracefulShutdown;

// Define database connection string and use it to open Mongoose connection
var dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);

// Listening for SIGINT on Windows
if (process.platform === "win32"){
    // console.log(`This platform is ${process.platform}`);
    log.info('Application running on %s', process.platform);
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}

// Reusable function to close Mongoose connection
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
  console.log('Mongoose disconnected through ' + msg);
  // Don't show in log file!!! Why?
  // log.info('Mongoose disconnected through %s', msg);
  callback();
  });
};

/* Listen to Node processes for termination or restart signals, and call
gracefulShutdown function when appropriate, passing a continuation callback */
// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
  process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
  process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function () {
  process.exit(0);
  });
});
/*process.on("SIGINT", function () {
  // Graceful shutdown
  process.exit();
});
*/

// Listen for Mongoose connection events and output statuses to console (log)
mongoose.connection.on('connected', function () {
    log.info('Mongoose connected to %s', dbURI);
    // console.log('Mongoose connected to %s', dbURI);
});
mongoose.connection.on('error',function (err) {
    log.error('Mongoose connection error: %s', err);
    // console.log('Mongoose connection error: %s', err);
});
mongoose.connection.on('disconnected', function () {
    log.info('Mongoose disconnected');
    // console.log('Mongoose disconnected');
});

require('./locations');
require('./snippets');

/*
{
        "_id" : ObjectId("5989b8f2bb289d66875cbf76"),
        "name" : "Starcup",
        "address" : "125 High Street, Reading, RG6 1PS",
        "rating" : 3,
        "facilities" : [
                "Hot drinks",
                "Food",
                "Premium wifi"
        ],
        "coords" : [
                -0.9690884,
                51.455041
        ],
        "openingTimes" : [
                {
                        "days" : "Monday - Friday",
                        "opening" : "7:00am",
                        "closing" : "7:00pm",
                        "closed" : false
                },
                {
                        "days" : "Saturday",
                        "opening" : "8:00am",
                        "closing" : "5:00pm",
                        "closed" : false
                },
                {
                        "days" : "Sunday",
                        "closed" : true
                }
        ],
        "reviews" : [
                {
                        "author" : "Simon Holmes",
                        "_id" : ObjectId("5989bb4abb289d66875cbf77"),
                        "rating" : 5,
                        "timestamp" : ISODate("2013-07-15T22:00:00Z"),
                        "reviewText" : "What a great place. I can't say enough goodthings about it."
                }
        ]
}

db.locations.insertOne({"name" : "Star", "address" : "125 High Street, Reading, RG6 1PS", "rating" : 3, "facilities" : [ "Hot drinks", "Food", "Premium wifi"], "coords" : [ -0.9690884, 51.455041]})





db.locations.update({"_id": ObjectId("598f7471d7b5d18ae2b5df27")},
{
    $push:
    {
        "reviews" :
            [
                {
                    "author" : "Simon Holmes", "rating" : 5, "timestamp" : ISODate("2013-07-15T22:00:00Z"),
                    "reviewText" : "What a great place. I can't say enough goodthings about it."
                }
            ]
        }
    }
})

db.locations.update({"_id": ObjectId("598f7471d7b5d18ae2b5df27")},{"name":"123"})




db.locations.update({_id: ObjectId("598f7471d7b5d18ae2b5df27")},{$push:{"reviews" :[{"author" : "Simon Holmes", "rating" : 5, "timestamp" : ISODate("2013-07-15T22:00:00Z"),"reviewText" : "What a great place. I can't say enough goodthings about it."}]}}})



{
        "_id" : ObjectId("598f70a3d7b5d18ae2b5df26"),
        "name" : "Star",
        "address" : "125 High Street, Reading, RG6 1PS",
        "rating" : 3,
        "facilities" : [
                "Hot drinks",
                "Food",
                "Premium wifi"
        ],
        "coords" : [
                -0.9690884,
                51.455041
        ],
        "reviews" : [
                [
                        {
                                "author" : "Simon Holmes",
                                "id" : ObjectId("5989bb4abb289d66875cbf77"),
                                "rating" : 5,
                                "timestamp" : ISODate("2013-07-15T22:00:00Z"),
                                "reviewText" : "What a great place. I can't say enough goodthings about it."
                        }
                ]
        ]
}




{
"name": "Star",
"address": "125 High Street, Reading, RG6 1PS",
"rating": 3,
"facilities": ["Hot drinks", "Food", "Premium wifi"],
"coords": [-0.9690884, 51.455041],
"openingTimes": [{
"_id": ObjectId("52ef3a9f79c44a86710fe7f6"),
"days": "Monday - Friday",
"opening": "7:00am",
"closing": "7:00pm",
"closed": false
}, {
"_id": ObjectId("52ef3a9f79c44a86710fe7f7"),
"days": "Saturday",
"opening": "8:00am",
"closing": "5:00pm",
"closed": false
}, {
"_id": ObjectId("52ef3a9f79c44a86710fe7f8"),
"days": "Sunday",
"closed": true
}],
"reviews": [{
"_id": ObjectId("52ef3a9f79c44a86710fe7f9"),
"author": "Simon Holmes",
"rating": 5,
"createdOn": ISODate("2013-07-15T23:00:00Z"),
"reviewText": "What a great place. I can't say enough good things about it."
}, {
"_id": ObjectId("52ef3a9f79c44a86710fe7fa"),
"author": "Charlie Chaplin",
"rating": 3,
"createdOn": ISODate("2013-06-15T23:00:00Z"),
"reviewText": "It was okay. Coffee wasn't great, but the wifi was fast."
}]
}



*/