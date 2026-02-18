const Listing = require("../models/listing");

//index route
module.exports.index = async(req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{ allListings });
};

//create new listing form
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

//create new listing submit and save
module.exports.createListing = async(req, res, next)=>{
    //extract all the data
    //let {title, description, image, price, location, country} = req.body;
    // let listing = req.body.listing;
    // console.log(listing);
        // if(!req.body.listing){
        //     throw new ExpressError(400,"Send valid data for listing");
        // }

        let url = req.file.path;
        let filename = req.file.filename;
        
        const newListing = new Listing(req.body.listing);
        // //console.log(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        await newListing.save();

        req.flash("success","New Listing Created!");
        res.redirect("/listings");
   
};


//show route
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path:"author"
            },
        })
        .populate("owner");
    // if(!listing){
    //     throw new ExpressError(404, "Listing not found");
    // }
     if(!listing){
        req.flash("error","Listing you requested for does not exits!!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{ listing });
};


//Edit route
module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    
    if(!listing){
        req.flash("error","Listing you requested for does not exits!!");
        return res.redirect("/listings");
    }
    //console.log(listing.image.url);
    
    let originalImageUrl = listing.image.url;
    // if (originalImageUrl) {
    //     originalImageUrl = originalImageUrl.replace("/upload","/upload/ar_1.0,c_fill,h_150,w_150/");
    // }
    // console.log(originalImageUrl);
    originalImageUrl = originalImageUrl.replace("/upload","/upload/ar_1.0,c_fill,h_100,w_150/");
   
    res.render("listings/edit.ejs",{ listing,originalImageUrl });
}


//update 
module.exports.updateListing = async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }
    let {id} = req.params;
    // let listing = await Listing.findById(id);
    // if(!listing.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","You don't have permission to edit listing");
    //     return res.redirect(`/listings/${id}`);
    // }


    let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    
    req.flash("success","Listing updated!");
    res.redirect(`/listings/${id}`);
};

//destroy
module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    //console.log(deletedList);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};

