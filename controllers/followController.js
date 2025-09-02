const User = require("../models/userModel");

exports.followToggle = async (req, res) => {
    const { id } = req.params
    const loggedInUser = req.user.id

    if(id === loggedInUser) {
        return res.status(400).json({ message: "You cannot follow yourself!" })
    }
    const userToFollow = await User.findById(id)
    if(!userToFollow) {
        return res.status(404).json({ message: "User not found!" })
    }
    const following = loggedInUser.following.includes(id)
    if(following) {
        await User.findByIdAndUpdate(
            loggedInUser,
            { $pull: { following: id }, $inc: { followingCount: -1 } },
            { new: true }
        )
        await User.findByIdAndUpdate(
            id,
            { $pull: { followers: loggedInUser }, $inc: { followersCount: -1 } }, 
            { new: true }
        )
        return res.json({ 
            message: "Unfollowed successfully",
            following: false,
        })
    }else{
        await User.findByIdAndUpdate(
            loggedInUser,
            { $addToSet: { following: id }, $inc: { followingCount: 1 } },
            { new: true }
        )
        await User.findByIdAndUpdate(
            id,
            { $addToSet: { followers: loggedInUser }, $inc: { followersCount: 1 } }, 
            { new: true }
        )
        return res.json({ 
            message: "Followed successfully",
            following: true,
        })
    }
}