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
    if (file.mimetype === 'image/jpg'|| file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
    const authorID = request.params.authorID
    AuthorModel.find({}).exec((err, allAuthors) => {
        response.json(allAuthors)
    })
})
router.get('/:authorID', (request, response) => {
    const authorID = request.params.authorID
    bookModel.find({ 'authId': authorID }).exec((err, author) => {
        response.json(author)
    })
  
})
router.get('/book/:authorID', (request, response) => {
    const authorID = request.params.authorID
    AuthorModel.findById(authorID).exec((err, author) => {
        response.json(author)
    })
})
router.get('/:authorID/details/:userId', (request, response) => {
    try {
        const authorID = request.params.authorID
        let details = {}
        AuthorModel.findById(authorID).exec((err, author) => {
            details['auth'] = author
        })
        bookModel.find({ 'authId': authorID, 'userShelvesandReveiews.userId': userId }).exec((err, books) => {
            details['books'] = books
        })

        return response.json(details)
    } catch{
        resp.json("something went wrong");
    }

})



router.post('/', upload.single('authorImage'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    const author = new AuthorModel({
        _id: new mongoose.Types.ObjectId(),
        authorImage: req.file.path,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth
    });
    author.save().then(result => {
        res.status(201).json({
            message: "Author registered successfully!",
            authorCreated: {
                _id: result._id,
                authorImage: result.authorImage,
                firstName: result.firstName,
                lastName: result.lastName,
                dateOfBirh: result.dateOfBirh
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})


router.patch('/:authorID',async (request, response,next) => {

    const authorData ={
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        dateOfBirh:request.body.dateOfBirh,
        authorImage:request.file?request.file.path: (await AuthorModel.findById(request.params.authorID).select('authorImage -_id')).authorImage
                    
    }
    try {
        const updateResult = await AuthorModel.findByIdAndUpdate(request.params.authorID, authorData, { new: true });
       console.log(updateResult)
        return response.json(updateResult);
    } catch (err) {
        response.json(err);
    }
    
    console.log(authorData)

})


router.delete('/:authorID', (request, response) => {
    const authorID = request.params.authorID;
    AuthorModel.findByIdAndDelete(authorID, (err, author) => {
        response.json(author)
    });

})
module.exports = router;
