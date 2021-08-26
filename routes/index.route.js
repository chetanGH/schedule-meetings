const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/index.controller');

router.route('/createMeeting').post(ctrl.createNewMeeting);
router.route('/basicMeeting').post(ctrl.basicMeeting);
module.exports = router;
