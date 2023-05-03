const { Voted } = require("../../models/Voted");
const {User} = require("../../models/User")
exports.fetchVoted = async (req,res)=>{
    try{
        let searchQuery =req.query.categoryId ? {categoryId:req.query.categoryId} : {}
        let voteds =await Voted.find(searchQuery).populate("categoryId");
        res.status(200).json({message:"Success",voteds})
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}

exports.sendVote = async (req,res)=>{
  
    try{
        let {categoryId,votedId} = req.body;
        if(categoryId && votedId){
              let isVoted = await User.find({
                    $and:[
                        {
                            vt:{
                                $elemMatch:{
                                    categoryId:{$eq:categoryId},
                                    votedId:{$eq:votedId}
                                }
                            }
                        },
                        {
                            _id:req.user._id
                        }
                    ]
                })
            if(!isVoted.length > 0){
                await User.updateOne(
                        {_id:req.user._id},
                        {
                            $push:{
                                vt:[{categoryId,votedId}]
                            }
                        }
                    );
                await Voted.updateOne({_id:votedId},{$inc:{voteCount:1}});
                res.status(200).json({message:"Voted Success fully"})
            }else{
                res.status(402).json({message:"You were Voted"})
            }
        }else{
            res.status(404).json({message:"Not found"})
        }
    }catch(err){
        res.status(500).json({message:"Something went wrong"});
    }
}