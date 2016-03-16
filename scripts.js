$(document).ready(function(){
	var query=$('#search').val().trim();
	var geocodeQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s'

	$.ajax({url: geocodeQueryURL, method: 'GET'})
	 
		.done(function(response) {

	     console.log(response);

	    
	}); 

});

// sample geocoder API URL : https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s


var geocoder = function (){
	var query = $('#search').val().trim();
	var geocodeQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s'

	$.ajax({url: geocodeQueryURL, method: 'GET'})
		.done(function(response) {

 		console.log(response);
 		var location = response.results[0].formatted_address;
		console.log('Location Query: ' + location);

		var place_id = response.results[0].place_id;
		console.log('GooglePlace ID: ' + place_id);

		var latitude = response.results[0].geometry.location.lat;
		console.log('Latitude: ' + latitude);

		var longitude = response.results[0].geometry.location.lng;
		console.log('Longitude: ' + longitude);

	}); 
}

$('#submit').on('click',function(){
	// var query = $('#search').val().trim();
	// var geocodeQueryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAzBECPmc6z_ppq-pud2BgfA6bmZOnC25s'

	geocoder();

	
	$('#search').val('');

	return false;
});