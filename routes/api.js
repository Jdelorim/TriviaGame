const db = require("../models");
module.exports = function(app) {
    var info = {
        username: '',
        highscore: 0
    };
    var createNew = false;
    
    app.get('/', function(req, res){
         res.sendFile(__dirname+'index.html');
       
    });
  
    
    app.post('/usersdb', function(req, res) {
        console.log('username:: ', req.body.username);
        info = {
            username: req.body.username,
            highscore: req.body.highscore
        }
        
        db.Users.findOne({username: info.username}, function(err,data){
            
                if(data == null) {
    
                    console.log('this is the data:::', data);
                    console.log('this should create new entry', info);
        
                    db.Users.create(info)
                        .then(function(info){
                        res.json(info);
                        createNew = true;
                        sendMe();
                        }).catch(function(err){
                        res.json(err);
                        console.log('fdfdsf');
                      });
                } else {
                    //send back to the front
                    console.log('already taken');
                    console.log(data.highscore);
                    
                }
            })
        })
    
    function sendMe(){
        app.get('/api/usersdb',function(req,res) {
            
            if(createNew === true){
                res.send(false);
            } else {
                res.send(true);
            }
            
        })
    }
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
}
