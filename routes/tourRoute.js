const express = require('express');
const tourControllers = require('../controllers/tourControllers');

const router = express.Router();

// You can use this middleware(router.param) to check for Invalid ID's; Also note it accepts up to 4 arguments
// router.param('id', tourControllers.checkID);

//Aliasing can be configured by creating your middleware
router.route('/top-5-cheap').get(tourControllers.aliasTopTours, tourControllers.getAllTour);


router.route('/')
// You can see middleware chaining on line 12 ie (tourControllers.checkBody, tourControllers.createTour)
.post(tourControllers.createTour)
.get(tourControllers.getAllTour);

router.route('/:id')
.get(tourControllers.getTour)
.patch(tourControllers.updateTour)
.delete(tourControllers.deleteTour);

module.exports = router;
