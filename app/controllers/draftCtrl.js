app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray", "$firebaseObject", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $firebaseObject, generalVariables) {

		// generalVariables.setHeight();

		window._ = _;

		generalVariables.checkUserLogin('draft');
		
		// get the logged in userId and set it to var currentUid
		var currentUid = generalVariables.getUid();
		console.log("currentUid that gets logged when draft page loads ----->", currentUid);



		// commented all this out because I only needed it to populate my firebase with players once.

		// var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");
		

		// var apiCall = $q(function(resolve, reject){
		// 	$http.get("http://www.fantasyfootballnerd.com/service/draft-rankings/json/j8vrkn628sv6/1/").success(
		// 	function(object) {
		// 		console.log("got this back from api -->", object);
		// 		resolve(object);
		// 	});
		// });
		
		//  //KEEP THIS. THIS IS WHERE I SET EACH PLAYER'S DRAFTED TO FALSE.
		// apiCall.then(function(data){
		// 	console.log("data is ", data.DraftRankings);
			
		// 	for (var i = 0; i < data.DraftRankings.length ; i++){
		// 		console.log("what the fruit");
		// 		 console.log("Current Balla status is ", data.DraftRankings[i]);
		// 		 data.DraftRankings[i].drafted = false;
		// 		 playerRef.push(data.DraftRankings[i]);
				 
		// 	}
		// });

		var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");

		var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+generalVariables.getUid());
		
		// empty array that will hold players AngularFire array that comes back when promise is complete
		$scope.loadedPlayers = [];

		$scope.teamPlayersArray = [];

		// takes the Firebase ref for the zPlayersList and turns it from an object into an array, which is
		// then processed through a promise and returned to the empty array above
		var playerArray = $firebaseArray(playerRef);
		


		playerArray
			.$loaded()
			.then(function(data) {
				$scope.loadedPlayers = playerArray;
			});

		//set player id
		$scope.do = function(yo) {
			var players = $scope.loadedPlayers;
			for (var i=0; i < players.length; i++){
				if (yo === players[i].$id) {
					$scope.modalPlayer = players[i];
					// console.log("players[i]", players[i]);
				}
			}
		};

		

		// if currentUid === teamPlayers/child.value
		var outputRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+currentUid);


		$scope.myPlayers = [];
		// watches for changes to firebase teamPlayers object (which is now an array)
		var teamPlayersArray = $firebaseArray(teamPlayersRef);
		
		

			teamPlayersArray.$loaded()
				.then(function(draftedPlayers){
					console.log("draftedPlayers ----> ", draftedPlayers);

					$firebaseArray(playerRef).$loaded()
					.then(function(allPlayers) {
						console.log("allPlayers ", allPlayers);

						for(var s = 0; s < draftedPlayers.length; s++) {
							_.filter(allPlayers, function(index) {
								if(draftedPlayers[s].$id ===  index.$id && draftedPlayers[s].$value === currentUid) {
									$scope.myPlayers.push(index);
								}
							});
						}
										

						teamPlayersArray.$watch(function(snapshot) { 
							console.log("snapshot ", snapshot);

							//if child has been added to teamPlayers
							if(snapshot.event === "child_added"){

								//get player info of player that matches key, and push that player into my players array
								$firebaseArray(playerRef).$loaded()
								.then(function(playersReturned){
									console.log("playersReturned ", playersReturned);

									//filter all returned players and grab player whose id matches the player added in the event above
									_.filter(playersReturned, function(index){
										if(index.$id === snapshot.key  && draftedPlayers[s].$value === currentUid){
											console.log(snapshot)
											console.log("player to add ", index);

											$scope.myPlayers.push(index);
										}
									})
								})
							}

console.log("my players ", $scope.myPlayers);
						});

						
					})


				});
		
		// teamPlayersArray.$watch(function(snapshot) { 

		// 	console.log("teamPlayersArray ", teamPlayersArray);

		// 	for(var i =0; i < teamPlayersArray.length; i++){
		// 		console.log("current item is ", teamPlayersArray[i]);

		// 		//if value of player id in teamPlayers assosiated with current users uid, push that playerId into arr
		// 		if(teamPlayersArray[i].$value === generalVariables.getUid()){
		// 			console.log("there is a match");
		// 			arr.push(teamPlayersArray[i].$id);

		// 		}
		// 	}

		// 	//call callback function here to house code below


		// 	console.log("arr ", arr);

		// 	$firebaseArray(playerRef).$loaded()
		// 	.then(function(players){

		// 		console.log("players ", players);

		// 			//loop over all players who are associated with the current user's id
		// 			for(var x = 0; x < arr.length; x++){

		// 				for(var z = 0; z < players.length; z++){

		// 					//if there is a match
		// 					if(arr[x] === players[z].$id){
		// 						$scope.benPlayers.push(players[z]);
		// 					}

		// 						//push that player object into our output array
		// 				}

		// 			}

		// 	})
		// });



			// $scope.loadedPlayers
			// 	.$loaded()
			// 	.then(function(stuff) {

			// 		// $scope.wut = $scope.loadedPlayers;
			// 		console.log("hey snapshot ", snapshot)

			// 		// arr.push(snapshot.key)
			// 		// console.log(snapshot.val());
		 //  			// console.log("teamPlayers changed! iterate over to update team roster");
		 //  			console.log($scope.loadedPlayers)
		 //  			for (var i = 0; i < arr.length; i++) {
		 //  				for (var j = 0; j < $scope.loadedPlayers.length; j++) {

		 //  					if (arr[i] === $scope.loadedPlayers[j].$id) {
		 //  						// console.log("first ----->", arr[i])
		 //  						// console.log("second ----->", teamPlayersArray[j].$id)
		 //  						var tA = $scope.loadedPlayers[j];
		 //  						draftlist.push({ displayName: tA['displayName'], team: tA['team'] })
		 //  						console.log("yo")
		  						
		 //  					};	
		 //  				}
		 //  			}

		 //  	});

		// });

		

		$scope.allDemPlayers = $firebaseObject(playerRef);
		

		// teamPlayersRef.on('value', function(snapshot) {
		// 	var obj = snapshot.val();
		// 	console.log("snapshot object --->", obj);

		// 	for (var key in obj) {
		// 		if (obj[key] === currentUid) {
		// 			// console.log("obj[key]", obj[key]);
		// 			// console.log("key", key);
		// 			// console.log("true");
		// 			console.log('current player', $scope.allDemPlayers[key]);
		// 			$scope.myPlayers.push($scope.allDemPlayers[key]);


		// 			// got user's key here, which is the value of the player key in teamPlayers obj, so need to get a ref
		// 			// to player's info for output to each team
		// 		}
		// 	}

		// 	console.log("scope.myPlayers", $scope.myPlayers);
		// });

		
		
		//push playerid:userId to teamPlayers in firebase
		$scope.draftPlayer = function() {
			teamPlayersRef.child($scope.modalPlayer.$id).set(generalVariables.getUid());
			console.log("teamPlayersRef.child($scope.modalPlayer.$id) -----> here", teamPlayersRef);

			//get ref to player's 'drafted' key, set 'drafted' to true
			playerRef.child($scope.modalPlayer.$id).child("drafted").set(true);
		};


				
}]);




			




			
								
