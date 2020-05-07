const express = require('express')
const authorRouter = require('./routes/author')
const categoryRouter = require('./routes/category')
const mongoose = require('mongoose')
const PORT =process.env.PORT || 8000

const app = express();
app.use(express.json())
app.use(express.urlencoded()
)
mongoose.connect('mongodb://localhost:27017/GoodReads',(err)=>{
    if (!err) return console.log("successfully connect db")
    console.log(err)
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});

app.use('/authors',authorRouter)
app.use('/category',categoryRouter)
app.use((request,response,next)=>{
    console.log(`${new Date()} - ${request.method} - ${request.url}`)
   next()
})