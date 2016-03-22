
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

				
				
			var beer='http://api.brewerydb.com/v2/search/geo/point?lat='+latitude+'&lng='+longitude+'&key=323c58933e00881cf1392f01e78dbbe9';
			
	
			$.ajax({url: beer, method: 'GET'})
				.done(function(response) {
					var info= response.data[0];
					console.log(response.data)
					console.log(info); //all info
					console.log("Name: "+response.data[0].brewery.name); //brewey name
					console.log("description: "+ response.data[0].brewery.description); //description
					console.log("brewery website: "+ response.data[0].brewery.website)
					console.log("image: "+ response.data[0].brewery.images.medium)
					
					var image=$('<img>');
					image.attr('src',response.data[0].brewery.images.medium)
					image.addClass('beerimage');
				$('#buzzDisplay').empty();
				$('#buzzDisplay').append("<br/>"+response.data[0].brewery.name)
								.append(image);


				}); 
			
			
			
			var news= 'https://webhose.io/search?token=8aafca50-182e-46d2-9757-4836befd1363&format=json&q='+query+'&location='+query+'&thread.title='+query+'';
			$.ajax({url: news, method: 'GET'})
				.done(function(response) {
					$(this).addClass('active');
				var random=Math.floor(Math.random() * 10) + 1;
					var info= response.posts[random];
					var info1=response.posts[random+1];
					var info2=response.posts[random+2];
					var info3=response.posts[random+3];
					console.log(info);
					console.log(info1);
					console.log(info1.thread.title);

					var link="www.coolinfoonthisspecificcountry.com";
					var x=info.thread.title;
					var y= link.link(info.thread.url);
					var z=link.link(info1.thread.url);
					var a=link.link(info2.thread.url);
					var b=link.link(info3.thread.url);

					$('#newsDisplay').empty();
					//console.log(info.thread.url);
					$('#newsDisplay').append(" <br/>"+ "1: " +info.thread.title+"<br/>")
						.append(+"Click here! "+ y+"<br/>")
						.append("<br/>"+ "2: "+info1.thread.title)
						.append("<br/>"+"Click here! "+ z)
						.append("<br/>"+ "3: "+info2.thread.title)
						.append("<br/>"+"Click here! "+ a)
						.append("<br/>"+ "4: "+info3.thread.title)
						.append("<br/>"+"Click here! "+ b);
						
						
				//if it doesnt have the class active in delete the content inside of it. 	

			}); 
		 
			//click on a button and empties the articles in newsDisplay
		});
		 
	}

	//on click, search and make AJAX ca;;s.
	$('#submit').on('click',function(){

		geocoder();

		$('#search').val('');

		return false;
	});
});