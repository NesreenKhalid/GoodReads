const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/author');
const bookModel = require('../models/books');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (request, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
});



router.get('/', (request, response) => {
    AuthorModel.find({}).exec((err, allAuthors) => {
        response.json(allAuthors)
    })
})
router.get('/:authorID', (request, response) => {
    const authorID = request.params.authorID
    bookModel.find({'authId': authorID}).exec((err, author) => {
        response.json(author)
    })
    // AuthorModel.findById(authorID).exec((err, author) => {
    //     response.json(author)
    // })
})
router.get('/:authorID/details/:userId', (request, response) => {
    const authorID = request.params.authorID 
    let details = {}
    AuthorModel.findById(authorID).exec((err, author) => {
        details['auth'] = author
    })
    bookModel.find({'authId': authorID, 'userShelvesandReveiews.userId': userId}).exec((err, books) => {
        details['books'] = books
    })

    response.json(details)
})
router.post('/', upload.single('authorImage'), (request, response) => {
    const idInsideObject = { _id: new mongoose.Types.ObjectId(),authorImage:request.file.path }
    const authorData = Object.assign(request.body, idInsideObject)

    const author = new AuthorModel(authorData)
    author.save((err, author) => {
        if (!err) {
            return response.json(author)
        }
        console.log(err)
        // response.send("cannot connect to database")
        response.send(err)


    })
});
router.patch('/:authorID', (request, response) => {
    const authorID = request.params.authorID;
    const author = AuthorModel.findByIdAndUpdate(authorID, request.body, { new: true }, (err, author) => {
        if (err) return response.status(500).send(err)
        return response.send(author);
    })
})
router.delete('/:authorID', (request, response) => {
    const authorID = request.params.authorID;
    AuthorModel.findByIdAndDelete(authorID, (err, author) => {
        response.json(author)
    });

})
module.exports = router;