var recentQs = new Firebase("https://trip2.firebaseIO.com");

var query;

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
	}
};

$("#recentQueries").append('<h2 style="display:inline-block;">Recent Queries</h2>');
$("#yourQueries").append('<h2 style="display:inline-block;">Your Queries</h2>');

recentQs.on("child_added", function(snap){
	$("#recentQueries").append('<li>' + snap.val().query + '</li><li>&rarr;</li>');
	$("#yourQueries").append('<li>' + localStorage.getItem("query") + '</li><li>&rarr;</li>');
}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
});







