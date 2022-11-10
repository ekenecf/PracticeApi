const express = require('express');
const tourControllers = require('../controllers/tourControllers');


const router = express.Router();

// You can use this middleware(router.param) to check for Invalid ID's; Also note it accepts up to 4 arguments
router.param('id', tourControllers.checkID);

router.route('/').post(tourControllers.createTour).get(tourControllers.getAllTour);
router.route('/:id').get(tourControllers.getTour).patch(tourControllers.updateTour);

module.exports = router;
