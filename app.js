var express = require("express");
var app = express();
var http = require("http").Server(app);
var https = require("https");
var urlencode = require('urlencode');
var request = require('request');
var apikey = "AIzaSyCbEro2l3CskEvE9KSPhlRBXZNEULCuw-Q";
var cseid = "004560571053577605299:oz1fjdm-qpk";

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
            /*選一個餐廳*/
            var len = json.results.length;
            var random = Math.floor(Math.random() * len);
            var shopname = json.results[random].name;
            var loc_lat = json.results[random].geometry.location.lat;
            var loc_lng = json.results[random].geometry.location.lng;
            var address = json.results[random].vicinity;
            var photo = json.results[random].photos;
            
            var str_to_front = {
                name : shopname,
                location : {lat:loc_lat,lng: loc_lng},
                address : address,
                photo : photo
            };
            res.json(str_to_front);
        });
    }).end();
});

app.get('/googleSearch', function(req, res) {
    var q = urlencode.encode(req.query.q, 'utf-8');
    var url = "https://www.googleapis.com/customsearch/v1?";
    url += "key=" + apikey + "&cx=" + cseid + "&q=" + q;
    console.log(url);
    request(url , function (error, response, body) {
        console.log(body);
		res.send("ok");
    });

});

http.listen(process.env.PORT, process.env.IP);