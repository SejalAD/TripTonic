const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const { isLoggedIn , isOwner,validateListing} = require("../middleware.js");


const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({storage : storage  });
//Listings

router
    .route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //create new listing submit and save
    .post( isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));
    


//create new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    //show route
    .get(wrapAsync(listingController.showListing))
    //update route
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))

    //delete route
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;