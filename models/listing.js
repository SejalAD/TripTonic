const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title : {
        type : String,
        //required : true,
        // minlength: 3,

    },
    description : {
        type : String,
        //required : true,
        // minlength: 10
    },

    // image: {
    //     filename: String,
    //     url: String,
    //     default : "https://images.unsplash.com/photo-1766933366411-7a921aebe181?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    //     set : (v) =>
    //          v === "" 
    //             ? "https://images.unsplash.com/photo-1766933366411-7a921aebe181?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    //             : v,
    // },

    // image: {
    //     // filename: {
    //     // type: String,
    //     // default: "listingimage"
    //     // },
    //     // url: 
        
    //     // set: (v) => 
    //     //     v === "" 
    //     //     ? "https://images.unsplash.com/photo-1654711317164-43bd5206a7f9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     //     : v,
    //     // },
    //     
    // },

    image:{
        url:String,
        filename:String,
    },

   price: {
        type: Number,
        required: true,
        min: 500,
    },
    location : {
        type : String,
        //required: true,
    },
    country : {
        type : String,
        //required: true,
    },

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],

    owner:{
        type:Schema.Types.ObjectId,
        ref : "User",
    }
});



//middleware called when listing is delete
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in : listing.reviews}});
    };
});


const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;

