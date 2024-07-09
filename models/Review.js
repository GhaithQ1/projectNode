const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    title:{
        type:String,

    },
    ratings:{
        type:Number,
        min:[1 , "Min rating value 1.0"],
        max:[5 , "Max rating value 5.0"]

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true , "Review must belong to user"]
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:[true , "Review must belong to product"]
    }
},{timestamps:true});

reviewSchema.pre(/^find/,function(next){
    this.populate({
      path:"user",
      select:"name"
    })
    next()
  })

const Review = mongoose.model("review" , reviewSchema);
module.exports = Review