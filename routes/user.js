const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passort = require("passport");
const { saveRedirect } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
    .route("/signup")
    //render form
    .get(userController.renderSignupForm)
    //signup
    .post(wrapAsync(userController.signup));


router
    .route("/login")
    //render login form
    .get(userController.renderLoginForm)
    //login
    .post(
        saveRedirect,
        passort.authenticate("local",{failureRedirect:"/login", failureFlash:true}),
        userController.login
    );

router.get("/logout",userController.logout);

module.exports = router;