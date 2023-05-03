const {Category,validate} = require("../../models/Category");
exports.addCategory = async(req,res)=>{
    const {error}  = validate(req.body);
    if(error) return res.status(402).json({message:error.details[0].message});
    const {name}= req.body;
    try{
        const category =await  Category.create({name});
        res.status(201).json({message:"Category Created Successfully",category})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
    
}

exports.fetchCategory = async (req,res)=>{
    try{
        const categories = await Category.find({},"-__v");
        res.status(200).json({message:"Fetch Categories Success",categories})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.deleteCategory =async (req,res)=>{
    try{
        let category =await Category.findByIdAndRemove(req.params.id);
        res.status(200).json({message:"Category Deleted Successfully",category})
    }catch(err){

        res.status(500).json({message:"Something went wrong"});
    }
}

exports.getCategory = async (req,res)=>{
    try{
        let category =await Category.findById(req.params.id);
        res.status(200).json({message:"Get Category Successfully",category})
    }catch(err){

        res.status(500).json({message:"Something went wrong"});
    }
}

exports.updateCategory = async (req,res)=>{
    try{
        let category = await Category.updateOne({_id:req.params.id},{$set:{name:req.body.name}})
        res.status(200).json({message:"Update Category Successfully",category})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}