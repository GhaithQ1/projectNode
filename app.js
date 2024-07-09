const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uplodes")));
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

const DB = require("./config/DB");

DB();




//Router Users
const routerUser = require('./router/UserRouter');
app.use('/shop/v1/user',routerUser);

//Router Auth
const routerAuth = require("./router/AuthRouter");
app.use('/shop/v1/auth',routerAuth)

//Router Category
const routerCategory = require("./router/CategoryRouter")
app.use("/shop/v1/category", routerCategory)

//Router SubCategory
const routerSubCategory = require("./router/SubCategoryRouter")
app.use("/shop/v1/subcategory", routerSubCategory)

//Router Brand
const routerBrand = require("./router/BrandRouter")
app.use("/shop/v1/brand", routerBrand)

//Router Product
const routerProduct = require("./router/ProductRouter")
app.use("/shop/v1/product", routerProduct)

//Router Review
const reviewProduct = require("./router/ReviewRouter")
app.use("/shop/v1/review", reviewProduct)


//Get Pages EJS
app.get("/" , (req,res)=>{
    res.render("index.ejs")
})
app.get("/signin" , (req,res)=>{
    res.render("signin.ejs")
})

app.listen(3000,()=>{
    console.log("App Is Run")
})