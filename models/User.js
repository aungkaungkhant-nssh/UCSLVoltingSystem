const mongoose = require("mongoose");
const Joi  = require("joi");
const bcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        uniqued:true
    },
    password:{
        type:String,
        required:true,
    },
    vt:[
       {
            categoryId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Category",
            },
            votedId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
       }
         
    ]
})
userSchema.pre("save",async function(){
    const salt = await bcypt.genSalt(10);
    this.password = await bcypt.hash(this.password,salt);
});
userSchema.methods.generateToken = async function(){
    return  await jwt.sign({_id:this._id},process.env.JWT_KEY);
}
userSchema.methods.matchPassword = async function(password){
     return await bcypt.compare(password,this.password);
}
const User = mongoose.model("User",userSchema);
function userValidate (user){
   const schema =  Joi.object({
        name:Joi.string().required(),
        phone:Joi.number().required(),
        password:Joi.string().required()
    })
    return schema.validate(user)
}
exports.User = User;
exports.validate = userValidate;