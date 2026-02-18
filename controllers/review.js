const Listing = require("../models/listing");
const Review = require("../models/review");

//create review
module.exports.createReview = async(req,res)=>{
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    newReview.author = req.user._id;
    // console.log(newReview);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // console.log("new review is added");\
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};


//destroy review
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // remove review reference from listing
    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });

    // delete review document itself
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};