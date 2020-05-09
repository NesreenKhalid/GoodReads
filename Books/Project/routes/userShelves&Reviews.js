const express = require('express');
const userShelvesandReveiewsModel = require('../models/userShelves&Reviews');
const router = express.Router();


router.get('/', async (req, resp) => {
    try {
        const getResult = await userShelvesandReveiewsModel.find({});
        return resp.json(getResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});



router.get('/:reviewId', async (req, resp) => {
    try {
        const GetByIdResult = await userShelvesandReveiewsModel.findById(req.params.bookId);
        return resp.json(GetByIdResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});



router.post('/', async (req, resp) => {
    const userShelvesandReviewsData = req.body;
    console.log(userShelvesandReveiewsModel.query);
    const userShelvesandReviews = new userShelvesandReveiewsModel(userShelvesandReviewsData);
    try {
        const postResult = await userShelvesandReviews.save();
        return resp.json(postResult);
    } catch (err) {
        resp.json(err);
    }
});



router.patch('/:reviewId', async (req, resp) => {
    try {
        const updateResult = await userShelvesandReveiewsModel.findByIdAndUpdate(req.params.bookId, { rating: req.body.rating, review: req.body.review, shelve: req.body.shelve, userId: req.body.userId, bookId: req.body.bookId, date: req.body.date }, { new: true });
        return resp.json(updateResult);
    } catch (err) {
        resp.json(err);
    }
});



router.delete('/:reviewId', async (req, resp) => {
    try {
        const deleteResult = await userShelvesandReveiewsModel.findByIdAndDelete(req.params.bookId);
        resp.json("Deleted Sucessfully");
    } catch (err) {
        resp.json("something went wrong");
    }
});




module.exports = router;