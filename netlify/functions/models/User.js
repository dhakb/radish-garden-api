const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        profilePicture: {
            filename: {
                required: true,
                type: String,
            },
            path: {
                required: true,
                type: String,
            },
        },
        coverPicture: {
            filename: {
                required: true,
                type: String,
            },
            path: {
                required: true,
                type: String,
            },
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 81,
        },
        location: {
            type: String,
            max: 50,
        },
        dimension: {
            type: String,
            max: 50,
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3]
        }

    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("User", UserSchema)