const route = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")


// ===== Register new user ======
route.post("/register", async (req, res) => {
    const {username, email, password} = req.body
    console.log(username, email, password)
    try {
        // Encrypt* Generate hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save new user and respond
        await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})



// ====== login already existing user =====
route.post("/login", async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email: email})
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(400).json("invalid password")

        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }

})

module.exports = route