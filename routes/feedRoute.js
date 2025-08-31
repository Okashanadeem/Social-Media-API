const express = require('express')
const router = express.Router()

const { getFeed } = require('../controllers/feedController')
const { auth } = require('../middlewares/auth')

router.get('/', auth, getFeed)

module.exports = router