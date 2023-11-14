const mongoose = require('mongoose')

const userReviewSchema = new mongoose.Schema({
  Author: {
    Name: String
  },
  Content: String,
  Stars: Number,
  UserId: mongoose.Schema.Types.Mixed
})

const UserReview = mongoose.model('review', userReviewSchema)

module.exports = UserReview
