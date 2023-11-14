const express = require('express')
const router = express.Router()
const userReviewController = require('../controllers/userReviewController')

router.get('/api/userReviews', userReviewController.getAllReviews)
router.post('/api/userReviews', userReviewController.createUserReview)
router.get('/api/userReviews/:userId', userReviewController.getUserReviews)
router.delete('/api/userReviews/:userId', userReviewController.deleteUserReview)

module.exports = router
