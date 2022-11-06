const route = require("express").Router()
const Message = require("../models/Message")


// Add Message
route.post("/", async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const response = await newMessage.save()
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(500)
    }
})


// Get Message
route.get("/:conversationId", async (req, res) => {
    const {conversationId} = req.params

    try {
        const response = await Message.find({conversationId})
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(500)
    }
})




module.exports = route