var express = require("express");
var app = express();
var http = require("http").Server(app);
var https = require("https");
var urlencode = require('urlencode');
var apikey = "AIzaSyDtFJs_awDvlStbCYz1PRqGCaq_beLkWjM";

app.use(express.static(__dirname + "/public"));

app.get('/search', function(req, res) {
    var keyword = urlencode.encode(req.query.keyword, 'utf-8');
    var radius = req.query.radius;
    var location = "25.0216697,121.5331069";
    var options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/place/nearbysearch/json?types=restaurant&language=zh-TW&keyword=' + keyword + "&radius=" + radius + "&key=" + apikey + "&location=" + location
    };
    
    https.get(options, function(response) {
        var str = "";
        
        response.on('data', function (chunk) {
            str += chunk;
        });
        
        response.on('end', function () {
            var json = JSON.parse(str);
            
            res.sendFile(str);
        });
    }).end();
});


http.listen(process.env.PORT, process.env.IP);