var express = require('express');
var router = express.Router();
// Include controller file
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlSnippets = require('../controllers/snippets');

// locations
// Define routes for locations
router.get('/locations', ctrlLocations.locationsListByDistance);
router.post('/locations', ctrlLocations.locationsCreate);
// router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.get('/locations/:name', ctrlLocations.locationsReadOne);
// router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
// router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
// Define routes for reviews
/*router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);*/
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
/*router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);
*/

// snippets
// Define routes for snippets
router.get('/snippets', ctrlSnippets.snippetsList);
// router.post('/snippets', ctrlSnippets.snippetsCreate);
router.get('/snippets/:id', ctrlSnippets.snippetsReadOne);
// router.put('/snippets/:id', ctrlSnippets.snippetsUpdateOne);
// router.delete('/snippets/:id', ctrlSnippets.snippetsDeleteOne);

// Export routes
module.exports = router;