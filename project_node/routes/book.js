const express = require('express');
const bookModel = require('../models/books');
const multer = require('multer');
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: diskStorage });
const router = express.Router();



router.get('/', async (req, resp) => {
    try {
        let searchVal = req.query.search
        
        if (searchVal) {
           const getResult = await bookModel.aggregate([{
                $match: {
                    name: {
                        '$regex': searchVal,
                        '$options': i
                    }
                }
            }])

        } else {
            const getResult = await bookModel.find({});
        }
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

router.get('/:userId/all', async (req, resp) => {
    try {
        const GetByIdResult = await bookModel.find({ 'userShelvesandReveiews.userId': req.params.userId });
        return resp.json(GetByIdResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});

router.get('/:userId/Reading', async (req, resp) => {
    try {
        const GetByIdResult = await bookModel.find(
            {
                'userShelvesandReveiews.userId': req.params.userId,
                'userShelvesandReveiews.shelve': "Reading"
            });
        return resp.json(GetByIdResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});

router.get('/:userId/WantsToRead', async (req, resp) => {
    try {
        const GetByIdResult = await bookModel.find(
            {
                'userShelvesandReveiews.userId': req.params.userId,
                'userShelvesandReveiews.shelve': "Wants to read"
            });
        return resp.json(GetByIdResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});

router.get('/:userId/Read', async (req, resp) => {
    try {
        const GetByIdResult = await bookModel.find(
            {
                'userShelvesandReveiews.userId': req.params.userId,
                'userShelvesandReveiews.shelve': "Read"
            });
        return resp.json(GetByIdResult);
    } catch (err) {
        resp.json("something went wrong");
    }
});



router.patch('/userShelvesandReviews/:bookId/:userId', async (req, res) => {
    global.total_rating = 0;
    global.average_rating = 0;
    global.result = 0;
    global.finalAverageRating=0;
    try {
        result = await bookModel.updateOne({
            '_id': req.params.bookId,
            'userShelvesandReveiews.userId': req.params.userId
        }, {
            '$set': {
                'userShelvesandReveiews.$.userId': req.params.userId,
                'userShelvesandReveiews.$.review': req.body.review,
                'userShelvesandReveiews.$.rating': req.body.rating,
                'userShelvesandReveiews.$.shelve': req.body.shelve
            }
        }, { upsert: true, new: true })
        console.log(result.n)
        res.json(result.n);
    } catch (err) {
        res.json(err);
    }
    if (!result.n) {
        try {
            const updateResult = await bookModel.findByIdAndUpdate(req.params.bookId, {
                '$addToSet': {
                    userShelvesandReveiews: {
                        userId: req.params.userId,
                        review: req.body.review,
                        rating: req.body.rating,
                        shelve: req.body.shelve,
                    },
                },
            },
                { new: true });
            console.log(updateResult);
        } catch (err) {
            console.log(err);
        }
    }
    let GetByIdResult = await bookModel.findById(req.params.bookId);
    GetByIdResult.userShelvesandReveiews.map((el, err) => {
        if (el.rating) {
            average_rating = average_rating + el.rating;
            total_rating = total_rating + 1;
        } else {
            average_rating = 0;
            total_rating = 0;
        }
        return el;
    });
    if(average_rating === 0){
        finalAverageRating=0;
    }else{
        finalAverageRating = (average_rating / total_rating);
    }
    const updatedResult = await bookModel.findByIdAndUpdate(req.params.bookId, {
        totalRatings: total_rating,
        avgRating:finalAverageRating
    }, { new: true })
    console.log(updatedResult);
})



router.post('/', upload.single('image'), async (req, resp) => {
    console.log(req.body);
    const book = new bookModel({
        name: req.body.name,
        image: req.file.path,
        authId: req.body.authId,
        catId: req.body.catId,
        productionDate: req.body.productionDate
    });
    try {
        const postResult = await book.save();
        return resp.json(postResult);
    } catch (err) {
        resp.json(err);
    }
});

/*router.patch('/UserShelvesandReviews/:bookId/:userId/f', async (req, resp) => {
    global.total_rating = 0;
    global.average_rating = 0;
    let GetByIdResult = await bookModel.findById(req.params.bookId);
    GetByIdResult.userShelvesandReveiews.map((el, err) => {
        if (el.rating) {
            average_rating = average_rating + el.rating;
            total_rating = total_rating + 1;
        } else {
            average_rating = 0;
            total_rating = 0;
        }
        return el;
    });
    total_rating = total_rating + 1;
    average_rating = (average_rating) + (parseInt(req.body.rating));
    try {
        const updateResult = await bookModel.findByIdAndUpdate(req.params.bookId, {
            '$addToSet': {
                userShelvesandReveiews: {
                    userId: req.params.userId,
                    review: req.body.review,
                    rating: req.body.rating,
                    shelve: req.body.shelve,
                },
            },
            totalRatings: total_rating,
            avgRating: (average_rating / total_rating)
        },
            {new: true });
        return resp.json(updateResult);
    } catch (err) {
        resp.json(err);
    }
})*/



router.patch('/:bookId', async (req, resp) => {
    try {
        const updateResult = await bookModel.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        return resp.json(updateResult);
    } catch (err) {
        resp.json(err);
    }
});



router.delete('/:bookId', async (req, resp) => {
    try {
        const deleteResult = await bookModel.findByIdAndDelete(req.params.bookId);
        resp.json("Deleted Sucessfully");
    } catch (err) {
        resp.json("something went wrong");
    }
});



module.exports = router;