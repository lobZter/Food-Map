var express = require("express");
var app = express();
var http = require("http").Server(app);
var https = require("https");
var urlencode = require('urlencode');
var apikey = "AIzaSyDtFJs_awDvlStbCYz1PRqGCaq_beLkWjM";

app.use(express.static(__dirname + "/public"));

http.listen(process.env.PORT, process.env.IP);

app.get('/', function(req, res) {
    res.sendFile( __dirname + "/index.html");
});
app.get('/', function(req, res) {
    res.sendFile( __dirname + "/result.html");
});
app.get('/search', function(req, res) {
    var keyword = urlencode.encode(req.query.keyword, 'utf-8');
    var radius = req.query.radius;
    var location = "25.0216697,121.5331069";
    
    var options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/place/nearbysearch/json?types=restaurant&language=zh-TW&keyword=' + keyword + "&radius=" + radius + "&key=" + apikey + "&location=" + location
    };
    var callback = function(response) {
        var str = "";
        
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            console.log(str);
            res.sendFile( __dirname + "/result.html");
        });
    }
    https.get(options, callback).end();
});