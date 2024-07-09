const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "category required"],
        unique: [true, "category must be unique"],
        minlenght: [3, "too short category name"],
        maxlenght: [30, "too long category name"],
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:{
        type:String,
      },
},{timestamps:true});


const ImageURL  =(doc)=>{
    const ImageURL = `${process.env.BASE_URL}/brand/${doc.image}`;
    doc.image = ImageURL
}

brandSchema.post('init' , (doc)=>{
    ImageURL(doc)
})
brandSchema.post('save' , (doc)=>{
    ImageURL(doc)
})

const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;