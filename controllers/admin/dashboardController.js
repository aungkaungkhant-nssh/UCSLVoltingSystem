const {Voted} = require('../../models/Voted');
const {Category} = require('../../models/Category');
const {User} = require('../../models/User');
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
exports.getDashboard = async(req,res)=>{
    try{
    
        let voteds = await Voted.aggregate([
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        let category = await Category.aggregate([
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        let user = await User.aggregate([
            {$group:{_id:null,count:{$sum:1}}}
        ]);
        
        let maxVoteCount = await Voted.aggregate([
            {$match:{categoryId:ObjectId(req.params.id)}},
            { $group: { _id: "null",count:{$max:"$voteCount"} }}
        ])
        console.log(maxVoteCount)
        let winner = [];
        if(maxVoteCount[0].count > 0 ){
             winner = await Voted.find({voteCount:maxVoteCount[0].count});
        }
        
 
        res.status(200).json({message:"Success",dashboard:{voteds,category,user,winner}})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}