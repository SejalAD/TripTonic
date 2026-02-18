const User = require("../models/user.js");

//signup form
module.exports.renderSignupForm = (req,res)=>{
    res.render("user/signUp.ejs");
};

//signup
module.exports.signup = async(req,res)=>{
    try{
        let { username , email , password} = req.body;
        const newUser = new User({ email , username});
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }   
};

//login form
module.exports.renderLoginForm = (req,res)=>{    
    res.render("user/login.ejs");
};

//login
module.exports.login = (req,res)=>{
        req.flash("success","Welcome to WanderLust, You're logged in!!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
        
};

//logout
module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        };
        req.flash("success","You're logged out!!");
        res.redirect("/listings");
    });
};
