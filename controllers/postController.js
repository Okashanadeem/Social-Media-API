const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')


exports.createPost = async (req, res) => {
    try {
        const { text } = req.body
        if (!text && !req.file) return res.status(400).json({ error: "Post not created as image OR text has to be inserted" })

        const newPost = await Post.create({
            authorName: req.user.id,
            text,
            image: req.file ? `/uploads/${req.file.filename}` : null
        })
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

exports.getPostById = async (req,res) => {
    const postById = await Post.findById(req.params.id)
    if(!postById) return res.status(404).json({error: "The post you are searching for is no longer available"})
    res.json({
        ...postById,
        likesCount: postById.likes.length,
        commentsCount: postById.comments.length,
        userLike: postById.likes.some(id=>id.toString() === req.user.id)
    })
}
