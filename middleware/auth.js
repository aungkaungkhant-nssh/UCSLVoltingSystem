const jwt = require("jsonwebtoken");
const {Admin} = require("../models/Admin");
const {User} = require("../models/User");
exports.isAdminAuth = async(req,res,next)=>{
    let token = getToken(req);
    if(!token) return res.status(401).json({message:"Unauthorized"})
    try{
        const decoded= jwt.verify(token,process.env.JWT_KEY);
        let admin = await Admin.findById(decoded._id);
        if(!admin) return res.status(401).json({message:"Invalid Token"})
        req.admin =admin;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
}

exports.isUserAuth = async(req,res,next)=>{
    let token = getToken(req);
    if(!token) return res.status(401).json({message:"Unauthorized"})
    try{
        const decoded= jwt.verify(token,process.env.JWT_KEY);
        let user = await User.findById(decoded._id);
        if(!user) return res.status(401).json({message:"Invalid Token"})
        req.user =user;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
}

function getToken(req){
    const authorization =  req.headers.authorization;
    if(!authorization) return false;
    let token = authorization.split(" ")[1];
    return token
}