var recentQs = new Firebase("https://trip2.firebaseIO.com");

var query;

$("#yourQueries").append('<h2 style="display:inline-block;">Your Queries: </h2>');

function pushData(){

	var query = $("#search").val().trim();
	
	if(query != ""){
		console.log('Firebase Query: ' + query);
	
		console.log('---------');
		
		
		localStorage.clear();
		localStorage.setItem("query", query);

		recentQs.push({
		  query: query
		});

		$("#yourQueries").append('<li><a href="#" class="btn" data-query="' + localStorage.getItem("query") + '">' + localStorage.getItem("query") + '</a></li><li>&rarr;</li>');
	}
	
	
};

$("#recentQueries").append('<h2 style="display:inline-block;">Recent Queries: </h2>');



recentQs.on("child_added", function(snap){
	$("#recentQueries").append('<li><a href="#" class="btn btn-sm" data-query="' + snap.val().query + '">' + snap.val().query + '</a></li><li>&rarr;</li>');
	
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});

$(".queriesli>a").click(function(){
	var clickQuery = $(this).data('query');
	console.log(clickQuery);
	geocoder(clickQuery);
});





