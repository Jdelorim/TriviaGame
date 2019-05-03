const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/muppetsDB'; 

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));

/////////////////////////
require('./routes/api.js')(app);

/////////////////////////////
app.listen(PORT, listening);
    function listening(){
        console.log(`your on PORT: ${PORT}`);
    }



