const mongoose = require('mongoose');
const userShelvesandReveiewsModel = require('./userShelves&Reviews');


const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, data: Buffer },
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'author' },
    catId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    totalRatings: { type: Number },
    avgRating: { type: Number },
    productionDate: { type: Date, required: true }
})



bookSchema.pre('find', async function () {
    userShelvesandReveiewsModel.getReveiewInfo((err, results) => {
        if (!err) {
            results.map(async (element, err) => {
                if (!err) {
                    try {
                        console.log("try entered");
                         await bookModel.findById(element._id, async function (err, doc) {
                            if (doc) {
                                console.log("document found");
                                doc.totalRatings = element.count;
                                doc.avgRating = element.avg_rating;
                                await doc.save(function (err) {
                                    if (!err) return console.log("updated sucessfully");
                                    return console.log(err);
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    } catch (err) {
                        console.log(err);
                    }
                    return element;
                } else {
                    return console.log(err);
                }
            })
        } else {
            return console.log(err);
        }
    })
})

const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel;
