

//Clicking the search button triggers the geocoder function. The output of geoocder is used in all other ajax calls.

$(document).ready(function(){

	var geocoder = function (){
	var query = $('#search').val().trim();
	var geocodeQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s';

		$.ajax({url: geocodeQueryURL, method: 'GET'})
			.done(function(response) {
			console.log("------GeoCoder!");

			var data = response.results[0];
			// results[0] pulls the FIRST result from geocoder API.
			
	 		console.log(response);
	 		var location = data.formatted_address;
			console.log('Location Query: ' + location);

			var place_id = data.place_id;
			console.log('GooglePlace ID: ' + place_id);

			var latitude = data.geometry.location.lat;
			console.log('Latitude: ' + latitude);

			var longitude = data.geometry.location.lng;
			console.log('Longitude: ' + longitude);

			var country = data.address_components[data.address_components.length - 1].long_name.trim();
			console.log('Country: ' + country);

			var showLocation = $('#infoDisplay');
			var showLocationFill = $('<div class="row">');
			var headLoc = $('#headerLoc');

			//this clears the DIVs of all contents.
			showLocation.empty();
			headLoc.empty();
			

			headLoc.append(location);

			//this is the placeholder for the google map!

			showLocationFill.append('<div class="col-md-6" id="locationInfo"><h2><i class="glyphicon glyphicon-globe"></i> ' + location + ' <span class="text-smaller" style="font-size:.8em;">('  + latitude.toFixed(2) + ' , ' + longitude.toFixed(2) + ')</span></h2></div>');
			showLocationFill.append('<div class="col-md-6" id="map">');
			

			showLocation.append(showLocationFill);
			// showLocation.append(mapDisplay);

			// attempt at google map places library
			var mapOptions = {
				center: new google.maps.LatLng(latitude, longitude),
				zone: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			var map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var service = new google.maps.places.PlacesService(map);

			var request = {
			    location: {lat: latitude, lng: longitude},
			    radius: '5000',
			    query: '[(attraction)]',
			    rankBy: google.maps.places.RankBy.DISTANCE
		  	};

			function callback(results, status) {
				console.log("------Google Places Library!");
				var placeDisplay = $('#buzzDisplay');
				placeDisplay.empty();

		  		if (status == google.maps.places.PlacesServiceStatus.OK) {
			    	for (var i = 0; i < results.length; i++) {
				      	var place = results[i];
				      	var types = place.types.join(' &#9900; ').replace(/_/g, ' ');

				      	if(place.photos){
	      					var placePhoto = place.photos[0].getUrl({'maxWidth': 320, 'maxHeight': 200});
		      			} else {
		      				var placePhoto = "images/no-image-available.png";
		      			}

		     	 		var googleCredit = $('<img src="images/powered-by-google-on-white.png" alt="powered by google">');

			     		placeDisplay.append('<div class="media"><div class="media-left media-middle"><img class="media-object placePic" src="' + placePhoto + '" alt="' + location + '"></div><div class="media-body"><h4 class="media-heading">' + place.name + '</h4><p>Google Rating: ' + place.rating + '<br />' + place.formatted_address + '</p><p class="text-muted">' + types  + '</p></div></div>');

			      		placeDisplay.append('<hr />');
					      //required Google credit
					      
				      	console.log('#'+(i+1));
				      	console.log(place.name);
				      	console.log(place.formatted_address);
				      	console.log(place);
				      	console.log(placePhoto);
			    	}
			    	placeDisplay.append(googleCredit);
			  	}
			}

			service.textSearch(request, callback);
			// end of map stuff

			// openWeather API Key = b0b52307eaa0d845eca3022f719aae3d
			var openWeatherURL = 'http://api.openweathermap.org/data/2.5/find?lat=' + latitude + '&lon=' + longitude + '&cnt=1&APPID=b0b52307eaa0d845eca3022f719aae3d';

			$.ajax({url: openWeatherURL, method: 'GET'})
			.done(function(response) {
			
	 		console.log("------Open Weather!");
	 		console.log(response);

	 		var weatherData = response.list[0];
	 		var tempK = weatherData.main.temp;
	 		var highTempK = weatherData.main.temp_max;
	 		var lowTempK = weatherData.main.temp_min;
	 		var condition = weatherData.weather[0].description;
	 		var windSpeed = weatherData.wind.speed;
	 		var windSpeedMPH = windSpeed * 0.62137;
	 		var windDir = weatherData.wind.deg;


	 		console.log(tempK);

	 		var tempC = Math.round(tempK - 273.15);
	 		var tempF = Math.round((tempK * 9/5) - 459.67);
	 		var highTempC = Math.round(highTempK - 273.15);
	 		var highTempF = Math.round((highTempK * 9/5) - 459.67);
	 		var lowTempC = Math.round(lowTempK - 273.15);
	 		var lowTempF = Math.round((lowTempK * 9/5) - 459.67);

	 		var weatherInfo = $('<div class="row">')
	 		console.log(tempF + "F , " + tempC + "C");

			// Today's Weather

			weatherInfo.append('<div class="col-md-12"><p>'+ tempF + '&#8457; <span class="text-smaller">(' + tempC + '&#8451;)</span>&nbsp;&nbsp;<span class="label label-info">' + condition + '</span>&nbsp;&nbsp;<span class="label label-default">High: ' + highTempF + '&#8457; <span class="text-smaller">(' + highTempC + '&#8451)</span></span>&nbsp;&nbsp;<span class="label label-success">Low: '  + lowTempF + '&#8457; <span class="text-smaller">(' + lowTempC + '&#8451;)</span></span></p>');
			weatherInfo.append('<p>Wind Speed: ' + windSpeedMPH.toFixed(2) + ' mph <span class="text-smaller">(' + windSpeed.toFixed(2) + ' km/h)</span></p>');
			weatherInfo.append('<p>Direction: ' + windDir + '&deg;</p></div>')
			weatherInfo.append('<div class="clearfix">');

			$('#locationInfo').append(weatherInfo);
		});

		// var fiveDayForecastURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&cnt=5&APPID=b0b52307eaa0d845eca3022f719aae3d';

		// 	$.ajax({url: fiveDayForecastURL, method: 'GET'})
		// 	.done(function(response) {
			
	 // 		console.log("------Five Day Forecast!!");
	 // 		console.log(response);
		// });

		var photoQueryURL ='https://api.flickr.com/services/rest/?&method=flickr.photos.search&lat=' + latitude + '&lon=' + longitude +'&has_geo=1&per_page=5&format=json&nojsoncallback=1&api_key=883c01db966eed32014011db7cb741de';

			$.ajax({url: photoQueryURL, method: 'GET'})
				.done(function(response) {
				var dataPhoto = response.results;

				console.log('------Flickr Photos!');
				console.log(response);
			}); 
		
		}); 
	}


	//on click, search and make AJAX ca;;s.
	$('#submit').on('click',function(){

		geocoder();

		$('#search').val('');

		return false;
	});
});
