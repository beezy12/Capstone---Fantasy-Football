app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray", "generalVariables",
	function($scope, $q, $http, $firebaseArray, generalVariables) {

		// generalVariables.setHeight();

		
		generalVariables.getUid();
		// generalVariables.checkUserLogin();



		// commented all this out because I only needed it to populate my firebase with players once.

		// var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");
		// var deletePlayersRef = new Firebase("https://capstonefootball.firebaseio.com/ydeleteDraftedPlayers");

		// var apiCall = $q(function(resolve, reject){
		// 	$http.get("http://www.fantasyfootballnerd.com/service/draft-rankings/json/j8vrkn628sv6/1/").success(
		// 	function(object) {
		// 		console.log("got this back from api -->", object);
		// 		resolve(object);
		// 	});
		// });

		// apiCall.then(function(data){
		// 	console.log("data is ", data.DraftRankings);
			
		// 	for (var i = 0; i < data.DraftRankings.length ; i++){
		// 		console.log("what the fruit");
		// 		 console.log("Current Balla status is ", data.DraftRankings[i]);
		// 		 data.DraftRankings[i].drafted = false;
		// 		 playerRef.push(data.DraftRankings[i]);
		// 		 deletePlayersRef.push(data.DraftRankings[i]);
		// 	}
		// });

		var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");

		// empty array that will hold players AngularFire array that comes back when promise is complete
		$scope.loadedPlayers = [];

		// takes the Firebase ref for the zPlayersList and turns it from an object into an array, which is
		// then processed through a promise and returned to the empty array above
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
			console.log("teamPlayersRef.child($scope.modalPlayer.$id) -----> here", teamPlayersRef);

			//get ref to players, set drafted to true
			playerRef.child($scope.modalPlayer.$id).child("drafted").set(true);

			// if drafted === true, add player to currentUid team list on draft list AND team homepage, and hide player card from draft list
			// if ($scope.modalPlayer.$id).child("drafted" === true) {
			// 	when $scope.myValue is truthy 
			// }
			
			// deletes player from draft list after pick
			// $scope.loadedPlayers.child.$remove($scope.modalPlayer.$id);

			
		};


				




			

}]);

