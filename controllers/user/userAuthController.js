const {User,validate} = require("../../models/User");
const _= require('lodash');
const Joi = require("joi");

//@desc userRegister
//@route POST /api/user/register
exports.userRegister = async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send({message:error.details[0].message});
    const {name,phone,password}  = req.body
    try{
        let existPhoneNumber = await User.findOne({phone});
        if(existPhoneNumber) return res.status(402).send({message:"Your Phone Number is already exist"});
        let user =  new User({name,phone,password});
        user = await user.save();
        let token = await user.generateToken();
        res.status(201).json({message:"Register Successfully",data:{..._.pick(user,["_id","name","phone","vt"]),token}})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

//@desc userLogin
//@route POST /api/user/login


exports.userLogin = async (req,res)=>{
    const {error} = validateLogin(req.body);
    if(error) return res.status(402).json({message:error.details[0].message});
    let {phone,password} = req.body;
    try{
        let user = await User.findOne({phone});
        if(user && await user.matchPassword(password)){
            let token = await user.generateToken();
            res.status(200).json({message:"Login successfully",data:{..._.pick(user,["_id","name","phone","vt"]),token}})
        }else{
            res.status(400).json({message:"Your Phone Number Or Password Invalid"})
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

function validateLogin (user){
    const schema = Joi.object({
        phone:Joi.number().required(),
        password:Joi.string().required()
    })
    return schema.validate(user);
}

