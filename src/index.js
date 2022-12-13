const express = require('express')
const router=require('./routes/student')
const app = express()
// const bodyParser = require("body-parser");
const  mongoose  = require('mongoose');
const port = 8080
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// // app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use('/',router)

// your code goes here
mongoose.connect('mongodb://localhost/Student',() => {
    console.log('connected to DB')
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;   