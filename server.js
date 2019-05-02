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

/////////////////////////
var info = {
    username: '',
    highscore: 0
};

app.get('/', function(req, res){
    res.sendFile(__dirname+'index.html');
});

app.post('/usersdb',function(req,res) {
       info = {
          username: req.body.username,
          highscore: req.body.highscore
      }
      db.Users.create(info)
      .then(function(info){
        res.json(info);
      }).catch(function(err){
        res.json(err);
    })
  })
// app.post('/usersdb', function(req,res) {
//     var info = {
//         username: req.body.username,
//         highscore: req.body.highscore
//     }
//    res.send("fdfdfd"+req.body.username);
//         db.Users.findOne({username: info.username}, function(err,data){
//             console.log('found it');
//             return;
//         }).then(function(data){
//             console.log('in data');
//             db.Users.create(data)
//                 .then(function(data){
//                     res.json(data);
//                 })
//                 .catch(function(err){
//                     res.json(err);
//                 })
//         })
//     })

    
//     db.Users.create(info)
//         .then(function(muppetsDB){
//             res.json(muppetsDB);
//         })
//         .then(function(muppetsDB){
         


//         })
//         .catch(function(err){
//             res.json(err);
//         })
// });
//send to the front
// app.get('/api/usersdb', function(req,res) {
//     res.send('hello');
//     db.Users.findOne({username: muppetsDB.username}, function(err,data){
//         console.log('found it');
//     })
// })
// app.get('/api/usersdb', function(req,res) {
//     res.send('hello');
//     db.Users.findOne({username: info.username}, function(err,data){
//         console.log('found it');
//     });
// });

// app.post('/usersdb', function(req, res) {
//     console.log("FROM FRONT:"+req.body.username);
//      info = {
//         username: req.body.username,
//         highscore: req.body.highscore
//     }

//     db.Users.create(info)
//         .then(function(muppetsDB){
//             console.log("info: "+muppetsDB.username);
            
//             db.Users.findOne({username: muppetsDB.username}, function(err,info){
//                 console.log('its a match', info);
//             })
//             db.Users.find({}, function(err, muppetsDB) {
//                     if (!err){ 
//                         console.log(muppetsDB);
//                         return;
//                     } else {throw err};
//                 });
                
//         }).then(function(muppetsDB){
//             // res.json(muppetsDB);
//         })
//         .catch(function(err){
//             res.json(err);
//         });
// });

app.post('/updateScore', function(req,res) {
    console.log('highscore: '+req.body.highscore);
    console.log('uname:', info.username);
    db.Users.findOneAndUpdate({username: info.username},{$set:{highscore: req.body.highscore}},{new: true},(err,doc)=>{
                if(!err){
                    console.log(doc);
                } else {
                    console.log(err);
                }
            })
        res.redirect('/');
})

app.get('/clearDB', function(req,res){
    //use deleteMany instead of remove
    db.Users.deleteMany({}).then (function(){
        res.redirect('/');
    });
});

/////////////////////////////
app.listen(PORT, listening);
    function listening(){
        console.log(`your on PORT: ${PORT}`);
    }



