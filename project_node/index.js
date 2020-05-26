const express = require('express')
const authorRouter = require('./routes/author')
const categoryRouter = require('./routes/category')
const bookRouter = require('./routes/book');

const mngoosePort = process.env.MONGOPORT || 'mongodb://localhost:27017/GoodReads'

const mongoose = require('mongoose')
const PORT =process.env.PORT || 8000

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use('/static', express.static('static'));

mongoose.connect(mngoosePort, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) return console.log('DataBase Connected Successfully');
    console.log(err);
})

app.listen(PORT, (err) => {
    if (!err) return console.log(`Server is listening on port ${PORT}!`);
    console.log(err);
})

app.use('/', (req, res, next)=>{
   console.log("home page");
})
app.use('/book', bookRouter);
app.use('/authors',authorRouter)
app.use('/category',categoryRouter)
// app.use('/:userId', )

app.use((request,response,next)=>{
    console.log(`${new Date()} - ${request.method} - ${request.url}`)
   next()
})