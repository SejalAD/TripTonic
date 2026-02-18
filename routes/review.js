const express = require("express");
const router = express.Router({mergeParams : true});
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const Review = require("../models/review");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js");



const reviewController = require("../controllers/review.js");
//Review
//review post route
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview));


//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);


module.exports = router;