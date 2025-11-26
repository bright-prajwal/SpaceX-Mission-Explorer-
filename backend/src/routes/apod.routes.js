const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const controller = require('../controllers/apod.controller');

router.get('/today', asyncHandler(controller.today));
router.get('/recent', asyncHandler(controller.recent));
router.get('/range', asyncHandler(controller.range));
router.get('/:date', asyncHandler(controller.byDate));

module.exports = router;
