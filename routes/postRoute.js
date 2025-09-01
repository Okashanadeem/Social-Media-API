const express = require('express')
const router = express.Router()

const { createPost, getPostById, updatePostById, deletePostById, toggleLike, createComments, getComments, getAllPosts, getAllComments } = require('../controllers/postController')
const validate = require('../middlewares/validate')
const { postValidator } = require('../validators/postValidator')
const { auth } = require('../middlewares/auth')

router.post('/', auth, validate(postValidator), createPost)
router.get('/', auth, getAllPosts)
router.get('/comments', auth, getAllComments)
router.get('/:id', auth, getPostById)
router.put('/:id', auth, updatePostById)
router.delete('/:id', auth, deletePostById)

// populate name of user in likes array remaining
router.post('/:id/like', auth, toggleLike)

// pouplate authorName and text in comments remaining
router.post('/:id/comments', auth, createComments)
router.get('/:id/comments', auth, getComments)


module.exports = router