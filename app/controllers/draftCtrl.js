app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray", "generalVariables",
	function($scope, $q, $http, $firebaseArray, generalVariables) {

		// generalVariables.setHeight();

		
		generalVariables.getUid();
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

	$scope.loadedPlayers = [];

	var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayers");

	var playerArray = $firebaseArray(playerRef);
	console.log("playerArray-->", playerArray);


	playerArray
		.$loaded()
		.then(function(data) {
			$scope.loadedPlayers = playerArray;
			console.log("$scope.loadedPlayers--->", $scope.loadedPlayers);
		});

	//set player id
	$scope.do = function(yo) {
		var players = $scope.loadedPlayers;
		for (var i=0; i < players.length; i++){
			if (yo === players[i].$id) {
				$scope.modalPlayer = players[i];
				console.log("players[i]", players[i]);
			}
		}
	};

	var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers");
	
	//push playerid:userId to teamPlayers in firebase
	$scope.draftPlayer = function() {
		teamPlayersRef.child($scope.modalPlayer.$id).set(generalVariables.getUid());
	};



	


	// do a promise here

	// $scope.draftPlayer = function() {
	// 	generalVariables.getUid()
	// 		.then(function(uid) {
	// 			var currentUid = uid;
	// 			console.log("currentUid --->", currentUid);
	// 			// return currentUid;
				
	// 			teamPlayersRef.push($scope.modalPlayer.$id);
	// 		})
	// 		.fail(function(error) {
	// 			console.log("you donked it");
	// 		});
	// };
		
		// $scope.draftPlayer = function() {
		// 	generalVariables.getUid()
		// 		.$loaded()
		// 		.then(function(uid) {
		// 			var currentUid = uid;
		// 			console.log("currentUid ----->", currentUid);
		// 		});
			
		// };
			

}]);

