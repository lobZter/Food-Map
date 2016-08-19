var express = require("express");
var app = express();
var http = require("http").Server(app);

app.use(express.static(__dirname + "/public"));

http.listen(process.env.PORT, process.env.IP);
