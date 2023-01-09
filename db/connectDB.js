const mongoose = require("mongoose")

const  connectDB = (mongoURI) => {
    mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("connected to MongoDB")
        }
    })
}

module.exports = connectDB


