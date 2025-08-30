const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')


// zPOST SECTION

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
        res.status(500).json({ error: error.message })
    }
}

exports.getPostById = async (req, res) => {
    const postById = await Post.findById(req.params.id)
    if (!postById) return res.status(404).json({ error: "The post you are searching for is no longer available" })
    res.json({
        ...postById,
        likesCount: postById.likes.length,
        commentsCount: postById.comments.length,
        userLike: postById.likes.some(id => id.toString() === req.user.id)
    })
}

exports.updatePostById = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id)
        if (!existingPost) return res.status(404).json({ error: "The post you are searching for is no longer available" })
        if (existingPost.authorName !== req.user.id) return res.status(403).json({ error: "You're not authorized to perform this action" })

        const updatedData = {}
        if (req.body.text) updatedData.text = req.body.text
        if (req.file) updatedData.image = `/uploads/${req.file.filename}`

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true, runValidators: true }
        )
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deletePostById = async (req, res) => {
    try {
        const existingPost = await Post.findById(req.params.id)
        if (!existingPost) return res.status(404).json({ error: "The post you are searching is no longer available" })
        if (existingPost.authorName !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: "You're not authorized to perform this action" })
        await Post.findByIdAndDelete(req.params.id)
        res.json({ message: "Post deleted successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// LIKE SECTION

exports.toggleLike = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.user.id

        const existingPost = await Post.findById(postId).select('likes')
        if (!existingPost) return res.status(404).json({ error: "The post you are searching is no longer available" })

        const alreadyLiked = existingPost.likes.includes(userId)

        const updated = alreadyLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            updated,
            { new: true, runValidators: true }
        ).select("likes")

        res.json({
            likes: !alreadyLiked,
            likesCount: updatedPost.likes.length
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// COMMENTS SECTION

exports.createComments = async (req, res) => {
    try {
        const { text } = req.body
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ error: error.message })

        const newComment = await Comment.create({
            authorName: req.user.id,
            text,
            post: post._id
        })
        await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: newComment._id } },
            { new: true, runValidators: true }
        )
        res.status(200).json(newComment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getComments = async (req,res) => {
    const { page = 1, limit = 5 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const comments = await Comment.find({post: req.params.id})
        .sort("-createdAt")
        .skip(skip)
        .limit(parseInt(limit))
    res.json(comments)
}