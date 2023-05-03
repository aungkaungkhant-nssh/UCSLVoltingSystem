const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const Category = mongoose.model("Category",categorySchema);
function categoryValidate (category){
    const schema = Joi.object({
        name:Joi.string().required()
    })
    return schema.validate(category);
}

exports.Category = Category;
exports.validate = categoryValidate