const mongoose  =require("mongoose");

const DB = ()=>{
    mongoose.connect("mongodb+srv://ghaithdrh:8w4cuU7MZdklyZfx@cluster0.pcolro1.mongodb.net/myproject?retryWrites=true&w=majority").then((res)=>{
        console.log("conneced succssfyle")
    }).catch((err)=>{
        console.log('connect is not succssfylle')
    })
}


module.exports = DB;