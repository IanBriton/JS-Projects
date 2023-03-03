const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userReview = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Review = mongoose.model("Review", userReview);

module.exports = Review;