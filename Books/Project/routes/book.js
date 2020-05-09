const express = require('express');
const bookModel = require('../models/books');
const multer = require('multer');
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: diskStorage });
const router = express.Router();



router.get('/', async (req, resp) => {
    try {
        const getResult = await bookModel.find({});
        return resp.json(getResult);
    } catch (err) {
        resp.json(err);
    }
});



router.get('/:bookId', async (req, resp) => {
    try {
        const GetByIdResult = await bookModel.findById(req.params.bookId);
        return resp.json(GetByIdResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});



router.post('/', upload.single('image'), async (req, resp) => {
    const bookData = req.body;
    const book = new bookModel({ ...bookData, image: req.file.path });
    try {
        const postResult = await book.save();
        return resp.json(postResult);
    } catch (err) {
        resp.json(err);
    }
});



router.patch('/:bookId', async (req, resp) => {
    try {
        const updateResult = await bookModel.findByIdAndUpdate(req.params.bookId, { name: req.body.name, image: req.body.image, authId: req.body.authId, catId: req.body.catId, productionDate: req.body.productionDate }, { new: true });
        console.log(updateResult);
        return resp.json(updateResult);
    } catch (err) {
        resp.json(err);
    }
});



router.delete('/:bookId', async (req, resp) => {
    try {
        const deleteResult = await bookModel.findByIdAndDelete(req.params.userId);
        resp.json("Deleted Sucessfully");
    } catch (err) {
        resp.json("something went wrong");
    }
});



module.exports = router;