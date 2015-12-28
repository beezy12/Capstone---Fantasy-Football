app.controller('teamCtrl', ["$scope", "$q", "$http", "$firebaseArray", "generalVariables",
	function($scope, $q, $http, $firebaseArray, generalVariables) {

    // console.log("ARE WE GETTING INSIDE TEAM CTRL OR NOT!!!!");
	
    // $scope.playersList = playersList;

	generalVariables.checkUserLogin('team');

	var currentUid = generalVariables.getUid();

	var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");

	var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+generalVariables.getUid());

	// $scope.playersList = generalVariables.getPlayers();
	// console.log("team ctrl getting back these players from the factory: ", $scope.playersList);


	$scope.myPlayers = [];
		// watches for changes to firebase teamPlayers object (which is now an array)
		var teamPlayersArray = $firebaseArray(teamPlayersRef);
		
			teamPlayersArray.$loaded()
				.then(function(draftedPlayers){
					

					$firebaseArray(playerRef).$loaded()
					.then(function(allPlayers) {
						

						for(var s = 0; s < draftedPlayers.length; s++) {
							for(var x = 0; x < allPlayers.length; x++) {

								if(draftedPlayers[s].$id ===  allPlayers[x].$id && draftedPlayers[s].$value === currentUid) {
									$scope.myPlayers.push(allPlayers[x]);

									//generalVariables.setPlayers(allPlayers[x]);
									//console.log("allPlayers[x]", allPlayers[x]);
									
								}
							}
						}
										

						teamPlayersArray.$watch(function(snapshot) { 
						

							//if child has been added to teamPlayers
							if(snapshot.event === "child_added"){

								//get player info of player that matches key, and push that player into my players array
								$firebaseArray(playerRef).$loaded()
								.then(function(playersReturned){
									

									//filter all returned players and grab player whose id matches the player added in the event above
									_.filter(playersReturned, function(index){
										if(index.$id === snapshot.key  && draftedPlayers[s].$value === currentUid){
											$scope.myPlayers.push(index);
										}
									});
								});
							}


						});

						
					});


				});



}]);