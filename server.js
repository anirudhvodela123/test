'use strict';
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var port = 3000;

app.use(express.json())

mongoose.connect('mongodb+srv://anirudh:anirudh@cluster0.ulq3gxg.mongodb.net/test')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err))

 


require("./routes/routes")(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
