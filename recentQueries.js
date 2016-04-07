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

		var a = localStorage.getItem("query")

		$("#yourQueries").append('<li><span class="queryButton btn btn-action btn-sm" data-query="' + a + '">' + a + '</span></li>');
	}


};

$("#recentQueries").append('<h2 style="display:inline-block;">Recent Queries: </h2>');

recentQs.on("child_added", function(snap){
	var b = snap.val().query;

	$("#recentQueries").append('<li><span class="queryButton btn btn-action btn-sm" data-query="' + b + '">' +b + '</span></li>');
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});

$(document).on('click','.queryButton',function clickSearch(){
	var clickQuery = $(this).data('query');
	console.log('The clickQuery: ' + clickQuery);
	geocoder(clickQuery);
});
