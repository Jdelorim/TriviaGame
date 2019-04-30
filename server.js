const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require("./models");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/muppetsDB'; 


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));
// mongoose.connect('mongodb://localhost/muppetsDB',{useNewUrlParser: true});
mongoose.connect('mongodb://localhost/muppetsDB', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});
app.get('*', function(req, res){
    res.sendFile('index.html');
  });
app.post('/usersdb', function(req, res) {
    console.log("fsfdsfsf"+req.body.username);
    var info = {
        username: req.body.username,
        highscore: "0"
    }
    db.Users.create(info)
        .then(function(muppetsDB){
            res.json(muppetsDB);
        })
        .catch(function(err){
            res.json(err);
        });
});

app.listen(PORT, listening);
    function listening(){
        console.log(`your on PORT: ${PORT}`);
    }



