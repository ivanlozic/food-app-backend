const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
  Name: String,
  UserId: mongoose.Schema.Types.Mixed,
  ProfilePicture: String,
  Content: String,
  Stars: Number,
});

const UserReview = mongoose.model('UserReview', userReviewSchema);

module.exports = UserReview;
