const router = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/User")


// ==== Update user =======
router.put("/:id", async (req, res) => {
    const {id} = req.params

    if (req.body.userId === id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err)
            }
        }

        try {
            const response = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            res.status(200).json({
                response,
                message: "changes has been recorded."
            })
        } catch (err) {
            res.status(500).json(err)
        }


    } else {
        res.status(403).json("Updating allowed only for own accounts!")
    }

})


//  ==== Delete user =====
router.delete("/:id", async (req, res) => {
    const {id} = req.params

    if (req.body.userId === id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(id)
            console.log("user", user)
            res.status(200).json("User deleted!")
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("Deleting allowed only for own accounts!")
    }
    res.json("end of deletion")
})


// ==== get a user =====
router.get("/", async (req, res) => {
    const {username, userId} = req.query
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username})
        const {createdAt, updatedAt, password, ...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
})


// ==== follow a user =====
router.put("/:id/follow", async (req, res) => {
    const {id} = req.params

    if (id !== req.body.userId) {

        try {
            const userToFollow = await User.findById(id)
            const currentUser = await User.findById(req.body.userId)

            if (!userToFollow.followers.includes(req.body.userId)) {
                await currentUser.update({$push: {followings: id}})
                await userToFollow.update({$push: {followers: req.body.userId}})
                res.status(200).json("User followed")
            } else {
                res.json("user already followed")
            }

        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("Not possible to follow yourself")
    }

})


//   ===== unfollow a user =====
router.put("/:id/unfollow", async (req, res) => {
    const {id} = req.params

    if (id !== req.body.userId) {

        try {
            const userToFollow = await User.findById(id)
            const currentUser = await User.findById(req.body.userId)

            if (userToFollow.followers.includes(req.body.userId)) {
                await currentUser.update({$pull: {followings: id}})
                await userToFollow.update({$pull: {followers: req.body.userId}})
                res.status(200).json("User unfollowed")
            } else {
                res.json("You can't unfollow who you don't follow")
            }

        } catch (err) {
            res.status(500).json(err)
        }


    } else {
        res.status(403).json("Not possible to unfollow yourself")
    }

})


//   ======= Get followings ======
router.get("/:userId/followings", async (req, res) => {
    const {userId} = req.params

    try {
        const {followings: followingUsersIds} = await User.findById(userId)
        const followingsData = await Promise.all(followingUsersIds.map(userId => User.findById(userId)))

        res.status(200).json(followingsData)
    } catch(err) {
        res.status(500).json(err)
    }


})



module.exports = router