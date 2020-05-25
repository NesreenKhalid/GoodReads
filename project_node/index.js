const express = require('express');
const authorRouter = require('./routes/author');
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');
const mongoose = require('mongoose');
const mngoosePort = process.env.MONGOPORT || 'mongodb://localhost:27017/GoodReads';
const PORT = process.env.PORT || 8000

const app = express();
app.use(express.json())
app.use(express.urlencoded())


mongoose.connect(mngoosePort, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) return console.log("successfully connect db")
  console.log(err)
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});

app.use('/authors', authorRouter)
app.use('/category', categoryRouter)
app.use('/book', bookRouter);
app.use((request, response, next) => {
  console.log(`${new Date()} - ${request.method} - ${request.url}`)
  next()
})