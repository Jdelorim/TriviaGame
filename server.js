const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.listen(PORT, listening);
    function listening(){
        console.log(`your on PORT: ${PORT}`);
    }



