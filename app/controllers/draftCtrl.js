app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray",
	function($scope, $q, $http, $firebaseArray) {

		// commented all this out because I only needed it to populate my firebase with players once.

		// var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayers");

		// var apiCall = $q(function(resolve, reject){
		// 	$http.get("http://www.fantasyfootballnerd.com/service/draft-rankings/json/j8vrkn628sv6/").success(
		// 	function(object) {
		// 		console.log("got this back from api -->", object);
		// 		resolve(object);
		// 	});
		// })

		// apiCall.then(function(data){
		// 	console.log("data is ", data.DraftRankings);
			
		// 	for (var i = 0; i < data.DraftRankings.length ; i++){
		// 		console.log("what the fruit");
		// 		 console.log("Current Balla status is ", data.DraftRankings[i]);
		// 		 data.DraftRankings[i].drafted = false;
		// 		 playerRef.push(data.DraftRankings[i]);
		// 	}


		// })


	var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayers");

	var playerArray = $firebaseArray(playerRef);
	console.log("playerArray-->", playerArray);

	// do a promise next?? look and see what ben did on pinterest



}]);

