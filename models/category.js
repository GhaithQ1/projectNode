const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const categorySchema = new mongoose.Schema({
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
    const ImageURL = `${process.env.BASE_URL}/category/${doc.image}`;
    doc.image = ImageURL
}

categorySchema.post('init' , (doc)=>{
    ImageURL(doc)
})
categorySchema.post('save' , (doc)=>{
    ImageURL(doc)
})

const Category = mongoose.model("category", categorySchema);

module.exports = Category;