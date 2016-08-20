var map;
var infowindow;
var service;
var options = Array(8);

function getLocation() {
	
  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var myLatlng = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			
			initMap(myLatlng, 50000);
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function initMap(myLatlng, radius) {
	
	var center = myLatlng;
	// center.lat -= 0.005;

	map = new google.maps.Map(document.getElementById('map'), {
	  center: center,
	  zoom: 15
	});
	
	infowindow = new google.maps.InfoWindow();
	
	// // 標記目前位置
	// var marker = new google.maps.Marker({
	//   map: map,
	//   position: myLatlng,
	//   icon: "/image/current-location.png"
	// });
	
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: center,
	  radius: radius,
	  type: ['restaurant']
	}, function (results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			
			for(var i=0; i<8; i++) {
				var random = Math.floor(Math.random() * (results.length + 1));
				options[i] = results[random];
				results[random] = results.pop();
			}
			
			console.log(options);
			initCanvas(options);
		}
	});
}

function initCanvas(options) {
	
	var color = ["#626262", "#787878", "rgba(0,0,0,0.5)", "#DCC722", "white", "#FF4350"];
	
	var ctx=document.getElementById('myCanvas').getContext('2d');
	var ctx1=document.getElementById('myCanvas01').getContext('2d');
	var ctx3=document.getElementById('myCanvas03').getContext('2d');
	var ctx2=document.getElementById('myCanvas02').getContext('2d');
	createCircle();
	initPoint();
	createCirText();
	
	//外圆
	function createCircle() {
    var startAngle = 0;//扇形的开始弧度
    var endAngle = 0;//扇形的终止弧度
    //画一个8等份扇形组成的圆形
    for (var i=0; i<8; i++) {
      startAngle = Math.PI*(i/4-1/8);
      endAngle = startAngle+Math.PI*(1/4);
      ctx.save();
      ctx.beginPath(); 
      ctx.arc(600, 600, 400, startAngle, endAngle, false);
      ctx.lineWidth = 480;
      if (i%2 == 0) {
      	ctx.strokeStyle = color[0];
      }else{
      	ctx.strokeStyle = color[1];
      }
      ctx.stroke();
      ctx.restore();
    } 
  }

  //各奖项
  function createCirText() {	 
    ctx.textAlign='start';
    ctx.textBaseline='middle';
    ctx.fillStyle = color[3];
    var step = 2*Math.PI/8;
    for(var i=0; i<8; i++) {
    	ctx.save();
    	ctx.beginPath();
        ctx.translate(600, 600);
        ctx.rotate(i*step);
        ctx.font = "Bold 32px Microsoft YaHei";
        ctx.fillStyle = color[3];
        console.log(options[i].name);
        ctx.textAlign = "center"; 
        ctx.fillText(options[i].name, 0, -460, 240);
        // ctx.font = " 14px Microsoft YaHei";
        // ctx.fillText("", -30, -95, 60);
        ctx.closePath();
        ctx.restore();
    }
	}

	function initPoint(){ 
    //箭头指针
    ctx1.beginPath();
    ctx1.moveTo(400, 96);
    ctx1.lineTo(360, 248);
    ctx1.lineTo(440, 248);
    ctx1.lineTo(400, 96);
    ctx1.fillStyle = color[5];
    ctx1.fill();
    ctx1.closePath();
    //中间小圆
    ctx3.beginPath();
    ctx3.arc(400, 400, 160, 0, Math.PI*2, false);
    ctx3.fillStyle = color[5];
    ctx3.fill();
    ctx3.closePath();
    //小圆文字
    ctx3.font = "Bold 48px Microsoft YaHei"; 
    ctx3.textAlign = 'start';
    ctx3.textBaseline = 'middle';
    ctx3.fillStyle = color[4];
    ctx3.beginPath();
    ctx.textAlign = "center"; 
    ctx3.fillText("一鍵", 352, 320, 160);
    ctx3.fillText("快搜", 352, 400, 160);
    ctx3.fill();
    ctx3.closePath();
    //中间圆圈
    ctx2.beginPath();
    ctx2.arc(300, 300, 300, 0, Math.PI*2, false);
    ctx2.fillStyle = color[2];
    ctx2.fill();
    ctx2.closePath();
	}

}

function runCup(num){
	var angles = rotAngle(num);
	var degValue = 'rotate('+angles+'deg'+')';
	$('#myCanvas').css('-o-transform',degValue);           //Opera
	$('#myCanvas').css('-ms-transform',degValue);          //IE
	$('#myCanvas').css('-moz-transform',degValue);         //Firefox
	$('#myCanvas').css('-webkit-transform',degValue);      //Chrome Safari
	$('#myCanvas').css('transform',degValue);
}

function rotAngle(num){
	// if (num == 0)	return 1800;
	// else if (num == 1) return 1845;
	// else if (num == 2) return 1890;
	// else if (num == 3) return 1935;
	// else if (num == 4) return 1980;
	// else if (num == 5) return 2025;
	// else if (num == 6) return 2070;
	// else if (num == 7) return 2115;
	
	
	if (num == 0)	return 2160 + 2160;
	else if (num == 1) return 2160 + 2115;
	else if (num == 2) return 2160 + 2070;
	else if (num == 3) return 2160 + 2025;
	else if (num == 4) return 2160 + 1980;
	else if (num == 5) return 2160 + 1935;
	else if (num == 6) return 2160 + 1890;
	else if (num == 7) return 2160 + 1845;
}


$(function() {
	
	$('#tupBtn').click(function() {
		
		var num = Math.floor(Math.random()*7);
		console.log(num);
		console.log(options[num].name);
		
		runCup(num);
		$('#tupBtn').attr("disabled", true);
		
		setTimeout(function() {
			$('#tupBtn').removeAttr("disabled", true);
		}, 6000);
		
		setTimeout(function() {
			createMarker(options[num]);
			// var center = new google.maps.LatLng(
			// 	options[num].geometry.location.lat,-0.005, 
			// 	options[num].geometry.location.lng);
			map.setCenter(options[num].location);
			$("#turnplate_box").animate({ 
        top: "+=800px",
      }, 1500);
		}, 6500);
		
	});
});


function createMarker(place) {
	console.log(place);
	
	service.getDetails({
  	placeId: place.place_id
	}, function(result, status) {
		console.log(result);
		
		var marker = new google.maps.Marker({
		  map: map,
		  position: result.geometry.location
		});
		
		var infowindowStr;
		
		if (result.photos.length == 0) {
			infowindowStr = "<div style='width: 350px'>" + 
			"<h3 style='margin-top: 0; margin-bottom: 8px'>" + result.name + "</h3>" + 
			result.formatted_address + "</br>" +
			result.formatted_phone_number + "</div>";
		}
		else {
			var photo = result.photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
			console.log(photo);
			
			infowindowStr = "<div><img src='" + photo + "'></div>" + 
				"<div style='width: 350px'><h3 style='margin-top: 0; margin-bottom: 8px'>" + result.name + "</h3>" + 
				result.formatted_address + "</br>" +
				result.formatted_phone_number + "</div>";
		}
		
		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.setContent(infowindowStr);
		  infowindow.open(map, this);
		});
	  infowindow.setContent(infowindowStr);
	  infowindow.open(map, marker);
	});

}