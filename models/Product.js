const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "too short product title"],
      maxlenght: [10, "too long product title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      minlength: [10, "too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantite is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    productAfterDiscount: {
      type: Number,
    },
    colore: [String],
    imageCover: {
      type: String,
      // required: [true, "product image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "product must be belong to caregory"],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be above or equal 1.0"],
      max: [5, "rating must be below or equal 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true ,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  }
);

ProductSchema.virtual('reviews',{
  ref:"review",
  foreignField:"product",
  localField:"_id"
})

const SetImageURL = (doc)=>{
  if(doc.imageCover){
    const imageCoverURL = `${process.env.BASE_URL}/product/${doc.imageCover}`;
    doc.imageCover = imageCoverURL;
  }
    if(doc.images){
      const images = []
      doc.images.forEach(img =>{
        const imageNameURL = `${process.env.BASE_URL}/product/${img}`;
        images.push(imageNameURL)
      })
      doc.images = images
    }

  
}

ProductSchema.post("init",  (doc)=>{
  SetImageURL(doc);
})
ProductSchema.post("save",  (doc)=>{
  SetImageURL(doc);
})

ProductSchema.pre(/^find/,function(next){
  this.populate({
    path:"category",
    select:"-_id"
  })
  next()
})
const product = mongoose.model("product", ProductSchema);

module.exports = product;