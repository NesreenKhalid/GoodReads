const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'sorry Name Is required and must be unique'], unique: true },
    image: { type: String, data: Buffer },
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'author',required: [true, 'author is required'] },
    catId: { type: mongoose.Schema.Types.ObjectId, ref: 'category',required: [true, 'category is required'] },
    userShelvesandReveiews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user.model", required: [true, 'userId is required and must be unique']},
        review: { type: String },
        rating: { type: Number, min: [1, 'it must be at least 1 number'], max: [5, 'sorry the mmaximum number of stars is 5'], maxlength: [1, 'rating must be one number'] },
        shelve: { type: String, required: [true, 'sorry the of shelve of the book is required'], enum: { values: ['Reading', 'Read', 'Wants to read'], message: 'Sorry the value of shelves must be one of this Read,Reading or Wants to read' } },
        date: { type: Date, required: true, default: Date.now }
    }],
    totalRatings: { type: Number },
    avgRating: { type: Number },
    productionDate: { type: Date, required: true }
})




const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel;
