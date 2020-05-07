const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    categoryName:{type:String,required:true,minlength:3,maxlength:30}

})
const CategoryModel = mongoose.model('category',CategorySchema)
module.exports = CategoryModel;