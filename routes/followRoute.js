const express = require('express');
const { followToggle } = require('../controllers/followController');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/toggle/:id', auth, followToggle);

module.exports = router;

