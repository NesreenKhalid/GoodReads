const express = require('express');
const authorRouter = require('./routes/author');
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');
const mongoose = require('mongoose');
const mngoosePort = process.env.MONGOPORT || 'mongodb://localhost:27017/GoodReads';
const PORT = process.env.PORT || 8000

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(express.urlencoded())

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions.origin));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mystore application." });
});

const db = require("./models");
const Role = db.role;

mongoose.connect(mngoosePort,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) return console.log("successfully connect db")
  console.log(err)
})

// intial function to create roles colletion
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

       
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


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