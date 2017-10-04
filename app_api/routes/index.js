var express = require('express');
var router = express.Router();
// Include controller file
var ctrlSnippets = require('../controllers/snippets');

// snippets
// Define routes for snippets
router.get('/snippets', ctrlSnippets.snippetsList);
// router.post('/snippets', ctrlSnippets.snippetsCreate);
router.get('/snippets/:id', ctrlSnippets.snippetsReadOne);
// router.put('/snippets/:id', ctrlSnippets.snippetsUpdateOne);
// router.delete('/snippets/:id', ctrlSnippets.snippetsDeleteOne);

// Export routes
module.exports = router;