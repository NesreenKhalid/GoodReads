const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mngoosePort = process.env.MONGOPORT || 'mongodb://localhost:27017/GoodReads'
const bookRouter = require('./routes/book');
const userShelvesandReviewsRouter = require('./routes/userShelves&Reviews');


app.use(express.json());
app.use(express.urlencoded());
app.use('/static', express.static('static'));


app.use('/book', bookRouter);
app.use('/userShelvesandReviews', userShelvesandReviewsRouter)


mongoose.connect(mngoosePort, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) return console.log('DataBase Connected Successfully');
    console.log(err);
})

app.listen(port, (err) => {
    if (!err) return console.log("Server is listening");
    console.log(err);
})

