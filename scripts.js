
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


			// openWeather API Key = b0b52307eaa0d845eca3022f719aae3d
			var openWeatherURL = 'http://api.openweathermap.org/data/2.5/find?lat=' + latitude + '&lon=' + longitude + '&cnt=1&APPID=b0b52307eaa0d845eca3022f719aae3d';

				$.ajax({url: openWeatherURL, method: 'GET'})
				.done(function(response) {

				// results[0] pulls the FIRST result from geocoder API.
				
		 		console.log("Open Weather!");
		 		console.log(response);

			});

			var photoQueryURL ='https://api.flickr.com/services/rest/?&method=flickr.photos.search&lat=' + latitude + '&lon='+longitude+'&has_geo=1&per_page=5&format=json&nojsoncallback=1&api_key=883c01db966eed32014011db7cb741de';


				$.ajax({url: photoQueryURL, method: 'GET'})
					.done(function(response) {
					var dataPhoto = response.results;
				console.log('Flickr Photos!');
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
