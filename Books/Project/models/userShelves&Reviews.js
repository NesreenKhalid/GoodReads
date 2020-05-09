const mongoose = require('mongoose');


const userShelvesandReviewsSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5, maxlength: 1 },
    review: { type: String },
    shelve: { type: String, required: true, enum: ['Reading', 'Read', 'Wants to read'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
    date: { type: Date, required: true, default: Date.now }
})
userShelvesandReviewsSchema.index({ userId: 1, bookId: 1 }, { unique: true });





userShelvesandReviewsSchema.statics.getReveiewInfo = function getReveiewInfo(cb) {
    userShelvesandReveiewsModel.aggregate([
        {
            $group: {
                _id: "$bookId",
                avg_rating: { $avg: "$rating" },
                count: { $sum: 1 }
            }
        }
    ], cb)
}

const userShelvesandReveiewsModel = mongoose.model('userReviewsandShelves', userShelvesandReviewsSchema);


module.exports = userShelvesandReveiewsModel ;



