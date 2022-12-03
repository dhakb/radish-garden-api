const router = require("express").Router()
const Post = require("../models/Post")
const User = require("../models/User")


// ===== Create post ======
router.post("/", async (req, res) => {
    const {userId, desc, img} = req.body

    try {
        const newPost = await new Post({userId, desc, img})
        await newPost.save()
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }

})

//  =====  Edit post ======
router.put("/:id", async (req, res) => {
    const {id: posId} = req.params
    const {userId} = req.body

    try {
        const postToUpdate = await Post.findById(posId)

        if (postToUpdate.userId === userId) {
            await postToUpdate.updateOne({$set: req.body})
            res.status(200).json("Post has been updated!")
        } else {
            res.status(403).json("You can update only your post")
        }

    } catch (err) {
        res.status(500).json(err)
    }

})


// ===== Delete post =====
router.delete("/:id", async (req, res) => {
    const {id: postId} = req.params
    const {userId} = req.body

    try {
        const postToDelete = await Post.findById(postId)
        if (postToDelete.userId === userId) {
            await postToDelete.deleteOne()
            res.status(200).json("Post has been deleted")
        } else {
            res.status(403).json("You can only delete your posts")
        }

    } catch (err) {
        res.status(500).json(err)
    }

})


// ====== Like post ======
router.put("/:id/like", async (req, res) => {
    const {id: postId} = req.params
    const {userId} = req.body


    try {
        const postToLike = await Post.findById(postId)
        // if (postToLike.userId !== userId) {

            if (!postToLike.likes.includes(userId)) {
                await postToLike.updateOne({$push: {likes: userId}})
                res.status(200).json("You liked post!")
            } else {
                await postToLike.updateOne({$pull: {likes: userId}})
                res.status(200).json("You disliked post!")
            }

        // } else {
        //     res.status(403).json("You can't like your post!")
        // }


    } catch (err) {
        res.status(500).json(err)
    }

})


// =====  Get single post  ======
router.get("/:id", async (req, res) => {
    const {id: postId} = req.params

    try {
        const post = await Post.findById(postId)
        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})


// ==== Get timeline posts (all posts of user followings and self) ====
router.get("/timeline/:userId", async (req, res) => {
    const {userId} = req.params

    try {
        const currentUser = await User.findById(userId)
        const currentUserPosts = await Post.find({userId: currentUser._id})
        const followingsPosts = await Promise.all(currentUser.followings.map(followingId => Post.find({userId: followingId})))

        // const followings = user.followings
        //
        // let posts = []
        // for (let user of followings) {
        //     const post = await Post.find({user})
        //     posts.push(post)
        // }
        console.log("fetched timeline")
        res.status(200).json(currentUserPosts.concat(...followingsPosts))
    } catch (err) {
        res.status(500).json(err)
    }
})


// ==== Get user's all post ====
router.get("/profile/:username", async (req, res) => {
    const {username} = req.params
    try {
        const currentUser = await User.findOne({username})
        const currentUserPosts = await Post.find({userId: currentUser._id})

        res.status(200).json(currentUserPosts)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router