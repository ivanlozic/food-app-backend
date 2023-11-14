const UserReview = require('../models/UserReview')

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await UserReview.find();

    if (allReviews.length === 0) {
      res.status(200).json({
        status: 'success',
        data: {
          reviews: [],
        },
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          reviews: allReviews,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve all reviews.',
    });
  }
};


const createUserReview = async (req, res) => {
  try {
    const { Name, UserId, ProfilePicture, Content, Stars } = req.body
    const newUserReview = new UserReview({
      Name,
      UserId,
      ProfilePicture,
      Content,
      Stars
    })
    const savedUserReview = await newUserReview.save()

    res.status(201).json({
      status: 'success',
      data: {
        userReview: savedUserReview
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create the user review.'
    })
  }
}

const getUserReviews = async (req, res) => {
  const userId = req.params.userId

  try {
    const userReviews = await UserReview.find({ UserId: userId })

    if (userReviews.length === 0) {
      res.status(200).json({
        status: 'success',
        data: {
          userReviews: []
        }
      })
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          userReviews: userReviews
        }
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user reviews.'
    })
  }
}
const deleteUserReview = async (req, res) => {
  const reviewId = req.params.reviewId

  try {
    const deletedReview = await UserReview.findByIdAndDelete(reviewId)

    if (!deletedReview) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found.'
      })
    }

    res.status(204).json()
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete the user review.'
    })
  }
}

module.exports = {
  getAllReviews,
  createUserReview,
  getUserReviews,
  deleteUserReview
}
