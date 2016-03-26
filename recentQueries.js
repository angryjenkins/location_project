	var recentQs = new Firebase("https://trip2.firebaseIO.com");

	var query;

	function pushData(){

		var query = $("#search").val().trim();
		
		
		console.log('Firebase Query: ' + query);
		
		console.log('---------');
		
		
		// localStorage.clear();
		// localStorage.setItem("minutesTill", minutesTill);
		// localStorage.setItem("nextTrain", nextTrain);

		recentQs.push({
		  query: query
		})
	};

	$("#recentQueries").append('<h2>Recent Queries</h2>');

	recentQs.on("child_added", function(snap){
    	$("#recentQueries").append('<li>' + snap.val().query + '</li>');
   		console.log(snap);
	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});




