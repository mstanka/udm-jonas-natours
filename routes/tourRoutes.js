const express = require('express');

const {
  checkID,
  checkBody,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourControler');

const router = express.Router();

// if no param in the route, its ignored and skipped
router.param('id', checkID);

router.route('/tours').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
