const Joi = require('joi');
const {Admin}  = require("../../models/Admin");
const _= require('lodash');
exports.adminLogin = async(req,res)=>{
    const {error}  = validateAdminLogin(req.body);
    if(error) return res.status(402).json({message:error.details[0].message});
    let {phone,password} = req.body;
    
    try{
        let admin = await Admin.findOne({phone});

        if(admin && await admin.matchPassword(password)){
            let token = await admin.generateToken();
            res.status(200).json({message:"Login successfully",data:{..._.pick(admin,["_id","name","phone"]),token}})
        }else{
            res.status(400).json({message:"Your Phone Number Or Password Invalid"})
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}


function validateAdminLogin (user){
    const schema = Joi.object({
        phone:Joi.number().required(),
        password:Joi.string().required()
    })
    return schema.validate(user);
}