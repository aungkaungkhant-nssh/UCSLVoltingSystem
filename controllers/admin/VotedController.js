const {Voted,validate} = require('../../models/Voted');
const {User} = require("../../models/User");
exports.addVoted = async(req,res)=>{
    const {error} =  validate(req.body);
    if(error) return res.status(402).json({message:error.details[0].message});
    const {name,rollNo,categoryId} = req.body;
    try{
        let voted=await Voted.create({name,rollNo,categoryId});
        res.status(201).json({message:"Voted Created Successfully",voted});
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }

}

exports.fetchVoted = async(req,res)=>{
    try{
        let voteds = await Voted.find({},"-__v").populate("categoryId");
        res.status(200).json({message:"Fetch Voted Successfully",voteds})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.deleteVoted = async (req,res)=>{
    try{
        let voted =await Voted.findByIdAndRemove(req.params.id);
        res.status(200).json({message:"Category Deleted Successfully",voted})
    }catch(err){

        res.status(500).json({message:"Something went wrong"});
    }
}

exports.getVoted = async(req,res)=>{
    try{
        let voted =await Voted.findById(req.params.id).populate("categoryId");
        res.status(200).json({message:"Get Voted Successfully",voted})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}
exports.updateVoted = async(req,res)=>{
    try{
        const {name,rollNo,categoryId} = req.body
        let voted = await Voted.updateOne({_id:req.params.id},{$set:{name,rollNo,categoryId}})
        voted = await Voted.findById(req.params.id).populate("categoryId")
        res.status(200).json({message:"Update Voted Successfully",voted})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

