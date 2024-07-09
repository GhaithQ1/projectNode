const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name Requied'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        required:[true , 'Email Required'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true , 'Password Required'],
        minlength:[6,"Too short password"]
    },
    passwordChanged:Date,
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResetVerified:Boolean,
    role:{
        type:String,
        enum:["admen" , "manger" , "user"],
        default:"user"
    },
    active:{
        type:Boolean,
        default:true
    }
},{timestamps:true});


UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password , 12);
    next()
})

const User = mongoose.model('user',UserSchema);

module.exports = User