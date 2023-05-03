const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require('joi-objectid')(Joi);

const votedSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollNo:{
        type:String,
        required:true
    },
    categoryId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
    },
    voteCount:{
        type:Number,
        default:0
    }
})

const Voted = mongoose.model("Voted",votedSchema);

function VotedValidate(voted){
    const schema = Joi.object({
        name:Joi.string().required(),
        rollNo:Joi.string().required(),
        categoryId:Joi.objectId().required()
    })
    return schema.validate(voted)
}


exports.Voted =Voted;
exports.validate = VotedValidate;
