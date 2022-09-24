const mongoose = require('mongoose');
const { ObjectId }  = mongoose.Schema


const commentSchema = new mongoose.Schema({
    comment: {
        type: Number,
        required: true
    },
    user_id: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: ObjectId,
        ref: 'Blog',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);