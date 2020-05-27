const mongoose = require('mongoose')
const AuthorSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    authorImage:{type:String},// required:true},
    firstName:{type:String,required:true,minlength:3,maxlength:15},
    lastName:{type:String,required:true,minlength:3,maxlength:15},
    dateOfBirthdateOfBirth:{type:Date }//, required:true },
})
const AuthorModel = mongoose.model('author',AuthorSchema)
module.exports = AuthorModel;