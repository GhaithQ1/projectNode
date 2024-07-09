const mongoose = require("mongoose");


const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        unique: [true, "SubCategory must be unique"],
    },
    slug:{
        type:String,
        lowercase:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "SubCategory must be belong to parent category"],
      },
},{timestamps:true});

subCategorySchema.pre(/^find/,function(next){
    this.populate({
      path:"category",
      select:"name -_id"
    })
    next()
  })

const SubCategory = mongoose.model("subcategory", subCategorySchema);

module.exports = SubCategory;