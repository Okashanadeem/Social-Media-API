const express = require('express')
const router = express.Router()

const { createPost, getPostById } = require('../controllers/postController')
const validate = require('../middlewares/validate')
const { default: postValidator } = require('../validators/postValidator')

router.post('/', validate(postValidator), createPost)
router.get('/:id', getPostById)

module.exports = router