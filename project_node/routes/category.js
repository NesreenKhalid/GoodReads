const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category');


router.get('/', (request, response) => {
    CategoryModel.find({}).exec((err, allCategory) => {
        response.json(allCategory)
    })
})
router.get('/:categoryID', (request, response) => {
    const categoryID = request.params.categoryID
    CategoryModel.findById(categoryID).exec((err, category) => {
        response.json(category)
    })
})
router.post('/', (request, response) => {
    const idInsideObject = { _id: new mongoose.Types.ObjectId() }
    const categoryData = Object.assign(request.body, idInsideObject)

    const category = new CategoryModel(categoryData)
    category.save((err, category) => {
        if (!err) {
            return response.json(category)
        }
        console.log(err)
        // response.send("cannot connect to database")
        response.send(err)


    })
});
router.patch('/:categoryID', (request, response) => {
    const categoryID = request.params.categoryID;
    CategoryModel.findByIdAndUpdate(categoryID, request.body, { new: true }, (err, category) => {
        if (err) return response.status(500).send(err)
        return response.send(category);
    })
})
router.delete('/:categoryID', (request, response) => {
    const categoryID = request.params.categoryID;
    CategoryModel.findByIdAndDelete(categoryID, (err, category) => {
        response.json(category)
    });

})
module.exports = router;