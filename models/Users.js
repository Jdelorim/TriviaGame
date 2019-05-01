var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Userschema = new Schema({
    username: {
        type: String,
        trim: true,
        default: "",
        required: true
    },
    highscore: {
        type: String,
        trim: true,
        default: "0",
        required: true 
    }
});

var Users = mongoose.model("Users", Userschema);
module.exports = Users;