const express = require('express');
const userControllers = require('../controllers/userControllers')
const app = express();

const router = express.Router();
app.use('/api/v1/tours', router);

router.route('/').get(userControllers.getAllUsers).post(userControllers.createUser);
router.route('/:id').get(userControllers.getUser).patch(userControllers.updateUser);

module.exports = router
