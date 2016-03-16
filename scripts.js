
// sample geocoder API URL : https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s

//geocoder function with AJAX calls.
$(document).ready(function(){
	var geocoder = function (){
	var query = $('#search').val().trim();
	var geocodeQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s'

		$.ajax({url: geocodeQueryURL, method: 'GET'})
			.done(function(response) {

			// results[0] pulls the FIRST result from geocoder API.
	 		console.log(response);
	 		var location = response.results[0].formatted_address;
			console.log('Location Query: ' + location);

			var place_id = response.results[0].place_id;
			console.log('GooglePlace ID: ' + place_id);

			var latitude = response.results[0].geometry.location.lat;
			console.log('Latitude: ' + latitude);

			var longitude = response.results[0].geometry.location.lng;
			console.log('Longitude: ' + longitude);

			//will need more AJAX calls to fill other APIs with this info.

		}); 
	}

	//on click, search and make AJAX ca;;s.
	$('#submit').on('click',function(){

		geocoder();

		$('#search').val('');

		return false;
	});
});
