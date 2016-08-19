var map;
var infowindow;
var service;

function getLocation() {
	
  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var myLatlng = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			
			initMap(myLatlng, 500);
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function initMap(myLatlng, radius) {
	
	var center = myLatlng;
	center.lat -= 0.005;

	map = new google.maps.Map(document.getElementById('map'), {
	  center: center,
	  zoom: 15
	});
	
	infowindow = new google.maps.InfoWindow();
	
	var marker = new google.maps.Marker({
	  map: map,
	  position: myLatlng,
	  icon: "/image/current-location.png"
	});
	
	service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location: center,
	  radius: radius,
	  type: ['restaurant']
	}, function (results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			var random = Math.floor(Math.random() * (results.length + 1));
			createMarker(results[random]);
		}
	});
}


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