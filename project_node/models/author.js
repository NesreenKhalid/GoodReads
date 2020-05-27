const mongoose = require('mongoose')
const AuthorSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    authorImage:{type:String},// required:true},
    firstName:{type:String,required:true,minlength:3,maxlength:15},
    lastName:{type:String,required:true,minlength:3,maxlength:15},
<<<<<<< HEAD
    dateOfBirthdateOfBirth:{type:Date }//, required:true },
=======
    dateOfBirth:{type:Date
        ,
        required:true
    },
>>>>>>> 8bc3d4df015e035d2e3fcffddb0dbe895a1deb8b
})
const AuthorModel = mongoose.model('author',AuthorSchema)
module.exports = AuthorModel;
