const express = require('express')
const router = express.Router()

const { createPost, getPostById, updatePostById, deletePostById, toggleLike, createComments, getComments } = require('../controllers/postController')
const validate = require('../middlewares/validate')
const { postValidator } = require('../validators/postValidator')

router.post('/', validate(postValidator), createPost)
router.get('/:id', getPostById)
router.put('/:id', updatePostById)
router.delete('/:id', deletePostById)

router.post('/:id/like', toggleLike)

router.post('/:id/comments', createComments)
router.get('/:id/comments', getComments)

module.exports = router