app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray", "$firebaseObject", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $firebaseObject, generalVariables) {

		// generalVariables.setHeight();

		window._ = _;


		$scope.users  = [
			{
				name: "Luke",
				id: "fdkjsfhadsufhkasdjfhkas",
				order: "first"
			},
			{
				name: "Joe",
				id: "jdsfjaian,wdsg",
				order: "last"
			}
		];

		generalVariables.checkUserLogin('draft');
		
		// get the logged in userId and set it to var currentUid
		var currentUid = generalVariables.getUid();
		console.log("currentUid that gets logged when draft page loads ----->", currentUid);


// 		// *********************** USE THIS TO POPULATE DRAFT PLAYERS LIST ****************************************************************


		

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


// // ***************************************************************************************************

		

		var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");

		var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+generalVariables.getUid());
		
		// var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList/"+generalVariables.getUid()+"/");
			//console.log("heeeeeeereee is the draftlist child attempt ------_>", draftRef);

		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

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

		// gets selected player's id and sets it to $scope.modalPlayer
		$scope.do = function(yo) {
			var players = $scope.loadedPlayers;
			for (var i=0; i < players.length; i++){
				if (yo === players[i].$id) {
					$scope.modalPlayer = players[i];
				}
			}
		};


		//push playerid:userId to teamPlayers in firebase
		$scope.draftPlayer = function() {
			teamPlayersRef.child($scope.modalPlayer.$id).set(generalVariables.getUid());
			console.log("teamPlayersRef.child($scope.modalPlayer.$id) -----> here", teamPlayersRef);

			//get ref to player's 'drafted' key, set 'drafted' to true
			playerRef.child($scope.modalPlayer.$id).child("drafted").set(true);


			// draftRef.push({
			// 	"players": $scope.modalPlayer.$id
			// });
		};


		

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

									generalVariables.setPlayers(allPlayers[x]);
									console.log("allPlayers[x]", allPlayers[x]);
									
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


			$scope.usersReadyToDraft = [];
			//console.log("$scope.usersReadyToDraft array right here", $scope.usersReadyToDraft);

			var userArray = $firebaseArray(userRef);

			userArray
				.$loaded()
				.then(function(online) {
					$scope.onlineUsers = userArray;
					console.log("$scope.onlineUsers READY", $scope.onlineUsers);

					for (var i = 0; i < $scope.onlineUsers.length; i++) {
						if ($scope.onlineUsers[i].online === true) {
							$scope.usersReadyToDraft.push($scope.onlineUsers[i].teamName);
							
						}
					}
				});
			

			
		


				
}]);


