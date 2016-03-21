
// sample geocoder API URL : https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s

// sample google Places URL https://maps.googleapis.com/maps/api/place/textsearch/json?parameters

//geocoder function with AJAX calls.
$(document).ready(function(){

	var geocoder = function (){
	var query = $('#search').val().trim();
	var geocodeQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s';
	

		$.ajax({url: geocodeQueryURL, method: 'GET'})
			.done(function(response) {
			console.log("GeoCoder!");

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
			var mapDisplay = $('<div class="col-md-12" id="map">');

			showLocation.empty();
			// $('.panelTitle').empty();
			// $('.panelTitle').append(location);
			showLocation.append('<div class="row"><div class="col-md-12 text-center"><p>' + location + '</p></div><div class="col-md-12 text-center"><p>(' + latitude.toFixed(2) + ' , ' + longitude.toFixed(2) + ')</p><div></div>');
			showLocation.append(mapDisplay);

			// attempt at google map places library
			var map = new google.maps.Map(document.getElementById('map'), {
		      center: query,
		      zoom: 15
		    });

			var service = new google.maps.places.PlacesService(map);

			var request = {
			    location: {lat: latitude, lng: longitude},
			    radius: '500',
			    query: 'attractions'
			  };

			function callback(results, status) {
				console.log("Google Places Library!");
				var placeDisplay = $('#buzzDisplay');
				placeDisplay.empty();

		  		if (status == google.maps.places.PlacesServiceStatus.OK) {
			    	for (var i = 0; i < results.length; i++) {
				      var place = results[i];
				      var placeDisplay = $('#buzzDisplay');

				      placeDisplay.append('<h2>' + place.name);
				      placeDisplay.append('<p>' + place.formatted_address);
				      placeDisplay.append('<p>Rating: ' + place.rating);

				      placeDisplay.append('<hr />');

				      console.log('#'+(i+1));
				      console.log(place.name);
				      console.log(place.formatted_address);
				      console.log(place);
			    	}
			  	}
			}

			service.textSearch(request, callback);
			// end of map stuff



			// openWeather API Key = b0b52307eaa0d845eca3022f719aae3d
			var openWeatherURL = 'http://api.openweathermap.org/data/2.5/find?lat=' + latitude + '&lon=' + longitude + '&cnt=1&APPID=b0b52307eaa0d845eca3022f719aae3d';

			$.ajax({url: openWeatherURL, method: 'GET'})
			.done(function(response) {
			
	 		console.log("Open Weather!");
	 		console.log(response);

	 		var weatherData = response.list[0];
	 		var tempK = weatherData.main.temp;
	 		var highTempK = weatherData.main.temp_max;
	 		var lowTempK = weatherData.main.temp_min;

	 		console.log(tempK);

	 		var tempC = Math.round(tempK - 273.15);
	 		var tempF = Math.round((tempK * 9/5) - 459.67);
	 		var highTempC = Math.round(highTempK - 273.15);
	 		var highTempF = Math.round((highTempK * 9/5) - 459.67);
	 		var lowTempC = Math.round(lowTempK - 273.15);
	 		var lowTempF = Math.round((lowTempK * 9/5) - 459.67);

	 		console.log(tempF + "F , " + tempC + "C");

	 		var showWeather = $('#weatherDisplay');
			showWeather.empty();

			var tempInfo = $('<div class="text-center">');
			tempInfo.append('<h2>Current Temp: '+ tempF + ' &#8457; , ' + tempC + ' &#8451;</h2>');
			tempInfo.append('<p>High: ' + highTempF + ' &#8457; , ' + highTempC + ' &#8451;</p>');
			tempInfo.append('<p>Low: ' + lowTempF + ' &#8457; , ' + lowTempC + ' &#8451;</p>');


			showWeather.append(tempInfo);
		});

		var photoQueryURL ='https://api.flickr.com/services/rest/?&method=flickr.photos.search&lat=' + latitude + '&lon=' + longitude +'&has_geo=1&per_page=5&format=json&nojsoncallback=1&api_key=883c01db966eed32014011db7cb741de';

			$.ajax({url: photoQueryURL, method: 'GET'})
				.done(function(response) {
				var dataPhoto = response.results;
			console.log('Flickr Photos!');
			console.log(response);
		}); 
		//not yet working - UN Data AJAX call.
		// var UNDataQueryURL ='https://api.undata-api.org/WHO/WHO%20Data/' + country + '/records?app_id=04296eeb&app_key=043ebf5a60b2ee49dada51cb8ef705fc';

		// 	$.ajax({url: UNDataQueryURL, method: 'GET'})
		// 		.done(function(response) {
		// 	console.log('UN Data!');
		// 	console.log(response);
		// }); 

		//Google Places Error XMLHttpRequest cannot load - does Faisal have the fix?
		// var googlePlacesQuery ='https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+' + query + '&key=AIzaSyAzBECPmc6z_ppq';

		// 	$.ajax({url: googlePlacesQuery, method: 'GET'})
		// 		.done(function(response) {
		// 		console.log('Google Places - "Restaurants In" Query!');
		// 		console.log(response);
		// 	}); 
		}); 
	}


	//on click, search and make AJAX ca;;s.
	$('#submit').on('click',function(){

		geocoder();

		$('#search').val('');

		return false;
	});
});
