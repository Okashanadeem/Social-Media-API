const express = require('express')
const router = express.Router()

const { createPost, getPostById, updatePostById, deletePostById, toggleLike, createComments, getComments, getAllPosts, getAllComments, getPostByUsername } = require('../controllers/postController')
const validate = require('../middlewares/validate')
const { postValidator } = require('../validators/postValidator')
const { auth } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/upload')

router.post('/', auth, upload.single("image"), validate(postValidator), createPost)
router.get('/', auth, getAllPosts)
router.get('/comments', auth, getAllComments)
router.get('/users/:username', auth, getPostByUsername)
router.get('/:id', auth, getPostById)
router.put('/:id', auth, updatePostById)
router.delete('/:id', auth, deletePostById)

// populate name of user in likes array remaining (DONE)
router.post('/:id/like', auth, toggleLike)

// pouplate authorName and text in comments remaining ( DONE )
router.post('/:id/comments', auth, createComments)
router.get('/:id/comments', auth, getComments)


module.exports = router