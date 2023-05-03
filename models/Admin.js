const mongoose  = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminSchema = new mongoose.Schema({
    name:String,
    phone:Number,
    password:String
})

adminSchema.methods.generateToken = async function(){
    return  await jwt.sign({_id:this._id},process.env.JWT_KEY);
}
adminSchema.methods.matchPassword =async function(password){
    return  await bcrypt.compare(password,this.password);
}
const Admin = mongoose.model("Admin",adminSchema);

exports.Admin = Admin;

// adminPssword  password@107