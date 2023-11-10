const express = require('express')
const router = express.Router()
const userReviewController = require('../controllers/userReviewController')

router.post('/api/userReviews', userReviewController.createUserReview)
router.get('/api/userReviews/:userId', userReviewController.getUserReviews)

module.exports = router
