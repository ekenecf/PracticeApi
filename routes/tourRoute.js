const express = require('express');
const tourControllers = require('../controllers/tourControllers');

const app = express();

const router = express.Router();
app.use('/api/v1/tours', router);

router.route('/').post(tourControllers.createTour).get(tourControllers.getAllTour);
router.route('/:id').get(tourControllers.getTour).patch(tourControllers.updateTour);

module.exports = router;
