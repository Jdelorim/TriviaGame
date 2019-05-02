
var mongoose = require('mongoose');
//keep connect code here to avoid deprecation err
mongoose.connect('mongodb://localhost:27017/muppetsDB', { useNewUrlParser: true });
var Schema = mongoose.Schema;

var Userschema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        default: "",
        required: true
    },
    highscore: {
        type: Number,
        trim: true,
        default: 0,
        required: true 
    }
});

var Users = mongoose.model("Users", Userschema);
module.exports = Users;