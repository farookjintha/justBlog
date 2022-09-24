const mongoose = require('mongoose');
const { ObjectId }  = mongoose.Schema


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    body: {
        type: String,
        required: true
    },
    genre: {
        type: ObjectId,
        ref: 'Genre',
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        ref: 'User',
        required: true
    },
    like_user_id: {
        type: Array,
        default: []
    },
    likes: {
        required: false,
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);