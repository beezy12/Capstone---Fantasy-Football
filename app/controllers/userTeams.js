app.controller("userTeamsCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables", "$routeParams",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables, $routeParams) {


		var id = $routeParams.playerId;
		console.log("id", id);


		$scope.collectedPlayer = [];
		//console.log($scope.collectedPlayer);


		var draftPlayers = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");
		$firebaseArray(draftPlayers).$loaded()
		.then(function(draftedPlayersId) {
			console.log("draftedPlayersId>>>>>", draftedPlayersId);

			var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+id);
			$firebaseArray(teamPlayersRef).$loaded()
				.then(function(userIds) {
				console.log("userIds*****", userIds);

				for(var i = 0; i < draftedPlayersId.length; i++) {
					for(var t = 0; t < userIds.length; t++) {
						if (draftedPlayersId[i].$id === userIds[t].$id) {
							$scope.collectedPlayer.push(draftedPlayersId[i]);
							//$scope.collectedPlayer.push(userIds[t].$id);
						}
					}
				}

				console.log("$scope.collectedPlayer ========", $scope.collectedPlayer);


			});
		});







}]);