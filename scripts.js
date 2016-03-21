
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

			var showLocation = $('#infoDisplay');

			showLocation.empty();
			$('.panelTitle').empty();
			$('.panelTitle').append(location);
			showLocation.append('<div class="row"><div class="col-md-12 text-center"><p>' + location + '</p></div><div class="col-md-12 text-center"><p>(' + latitude.toFixed(2) + ' , ' + longitude.toFixed(2) + ')</p><div></div>');

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

				var fTempInfo = $('<div class="text-center">');
				fTempInfo.append('<h2>Current Temp: '+ tempF + ' &#8457; , ' + tempC + ' &#8451;</h2>');
				fTempInfo.append('<h2>High: ' + highTempF + ' &#8457; , ' + highTempC + ' &#8451;</h2>');
				fTempInfo.append('<h2>Low: ' + lowTempF + ' &#8457; , ' + lowTempC + ' &#8451;</h2>');



				showWeather.append(fTempInfo);
			});

			var photoQueryURL ='https://api.flickr.com/services/rest/?&method=flickr.photos.search&lat=' + latitude + '&lon=' + longitude +'&has_geo=1&per_page=5&format=json&nojsoncallback=1&api_key=883c01db966eed32014011db7cb741de';

				$.ajax({url: photoQueryURL, method: 'GET'})
					.done(function(response) {
					var dataPhoto = response.results;
				console.log('Flickr Photos!');
				console.log(response);
			}); 
		}); 
	}

	$('.btn-toggle').click(function() {
	    $(this).find('.btn').toggleClass('active');  
	    
	    if ($(this).find('.btn-primary').size()>0) {
	    	$(this).find('.btn').toggleClass('btn-primary');
	    }
	    if ($(this).find('.btn-danger').size()>0) {
	    	$(this).find('.btn').toggleClass('btn-danger');
	    }
	    if ($(this).find('.btn-success').size()>0) {
	    	$(this).find('.btn').toggleClass('btn-success');
	    }
	    if ($(this).find('.btn-info').size()>0) {
	    	$(this).find('.btn').toggleClass('btn-info');
	    }
	    
	    $(this).find('.btn').toggleClass('btn-default');
	       
	});

	//on click, search and make AJAX ca;;s.
	$('#submit').on('click',function(){

		geocoder();

		$('#search').val('');

		return false;
	});
});
