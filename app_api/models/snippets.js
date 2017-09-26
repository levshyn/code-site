// Require Mongoose so that we can use its methods
var mongoose = require('mongoose');

// Without this is: (node:13828) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own
//  promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

// Start main location schema definition
var snippetSchema = new mongoose.Schema({
    /*
    1.1.0.1 - Ajax callback function in JavaScrip
    | | | |
    | | | -- method: callback = 1, promise = 2, Rx = 3;
    | | ---- library: not exists = 0, exist = 1;
    | ------ language: JavaScript = 1, typeScript = 2;
    -- thema: Ajax = 1.
    */
    id: { type: String, required: true },
    // Ajax
    thema: { type: String, required: true },
    // the title
    title: { type: String, required: true },
    // callback, promise, Rx
    method: { type: String },
    // JavaScript, TypeScript
    language: { type: String, required: true },
    // if the library exists (jQeury)
    lib: { type: String },
    // the code snippet
    codeSnippet: { type: String, required: true },
    // a link to the example if it exists
    link: { type: String },
    // is a visible?
    visible: { type: String, required: true }
    // ToDo
    // , date : {}
});

module.exports.mongooseModel = mongoose.model('Snippet', snippetSchema);
/*
{"id":"1.1.0.1", "thema":"ajax", "title":"Ajax callback function in JavaScript", "method":"callback", "language":"JavaScript", "lib":"no", "codeSnippet":"var newVar = 123", "link":"http://link.com"}
{"id":"1.1.0.2", "thema":"ajax", "title":"Ajax promise function in JavaScript", "method":"promise", "language":"JavaScript", "lib":"no", "codeSnippet":"var newVar = 123", "link":"http://link.com"}

*/