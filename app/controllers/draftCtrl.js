app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray", "$firebaseObject", "generalVariables", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $firebaseObject, generalVariables, $rootScope) {



		var prevPlayer;
		var currentPlayer;
		var i = 0;

		window._ = _;

		$rootScope.started = false;


		// run the checkUserLogin method stored in the generalVariables factory
		generalVariables.checkUserLogin('draft');

		// get the logged in userId and set it to var currentUid
		var currentUid = generalVariables.getUid();
		// console.log("currentUid that gets logged when draft page loads ----->", currentUid);


 		/*********************** USE THIS TO POPULATE DRAFT PLAYERS LIST *****************/




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


        /*************************************************************************************************/


		var ref = new Firebase("https://capstonefootball.firebaseio.com");

		var teamCountRef = new Firebase("https://capstonefootball.firebaseio.com/teamCount");

		var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");

		var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+generalVariables.getUid());


		var onlineRef = new Firebase("https://capstonefootball.firebaseio.com/user");


		var thisUserRef = new Firebase("https://capstonefootball.firebaseio.com/user/" + currentUid);



		$scope.userTeamName = [];





		// empty array that will hold players AngularFire array that comes back when promise is complete
		$scope.loadedPlayers = [];

		$scope.teamPlayersArray = [];


		// takes the Firebase ref for the zPlayersList and turns it from an object into an array, which is
		// then processed through a promise and returned to the empty array above
		var playerArray = $firebaseArray(playerRef);


		// gets the $firebaseArray version of the zplayersRef, called playerArray, and loads into a $scope
		// variable called $scope.loadedPlayers.
		playerArray
			.$loaded()
			.then(function(data) {
				$scope.loadedPlayers = playerArray;
			});

		// gets selected player's id and sets it to $scope.modalPlayer
		$scope.getPlayerId = function(playerId) {
			var players = $scope.loadedPlayers;
			for (var i = 0; i < players.length; i++) {
				if (playerId === players[i].$id) {
					$scope.modalPlayer = players[i];
				}
			}
		};

		//push playerid:userId to teamPlayers in firebase
		$scope.draftPlayer = function() {
			teamPlayersRef.child($scope.modalPlayer.$id).set(generalVariables.getUid());
			//console.log("teamPlayersRef.child($scope.modalPlayer.$id) -----> here", teamPlayersRef);

			//get ref to player's 'drafted' key, set 'drafted' to true
			playerRef.child($scope.modalPlayer.$id).child("drafted").set(true);


			ref.child("user").child($scope.usersReadyToDraft[$scope.currentTeamCount].$id).child("isTurn").set(false);



			//change turn
			ref.child("teamCount").transaction(function(fbTeamCount) {





			   // If /users/fred/rank has never been set, currentRank will be null.
			  //console.log("current turn is "+ $scope.usersReadyToDraft[$scope.currentTeamCount].teamName);
			  return fbTeamCount + 1;
			});

			ref.child("user").child($scope.usersReadyToDraft[$scope.currentTeamCount].$id).child("isTurn").set(true);


		};




		/********************** Functionality for drafting players and adding them to each team **********/

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



		/***************************** what teams are online / get team name to output to dom ********************************/

		$scope.usersReadyToDraft = [];
		//console.log("$scope.usersReadyToDraft array right here", $scope.usersReadyToDraft);

		var onlineArray = $firebaseArray(onlineRef);

		onlineArray
			.$loaded()
			.then(function(online) {
				$scope.onlineUsers = online;

				// *********** had this as $scope.onlineUsers = onlineArray.....but that didn't seem
				// right. So I changed it to just say online....so now Im using the promise.



				for (var i = 0; i < $scope.onlineUsers.length; i++) {
					if ($scope.onlineUsers[i].online === true) {

						$scope.usersReadyToDraft.push($scope.onlineUsers[i]);

					}

					if ($scope.onlineUsers[i].$id === currentUid) {
						$scope.userTeamName.push($scope.onlineUsers[i].teamName);
					}

				}

				i = 0;
				currentPlayer = $scope.usersReadyToDraft[i];

				//set firebase teamcount to i
				ref.child("teamCount").set(i);

					//update function --> when teamCOunt changes run this
					teamCountRef.on('value', function(value) {
					  // code to handle new value.

					  $scope.currentTeamCount = value.val();

					  // sets the counter back to 0 if it reaches the end of the online users array
					  if ($scope.currentTeamCount > $scope.usersReadyToDraft.length - 1) {
					  	ref.child("teamCount").transaction(function(fbTeamCount) {
						   // If /users/fred/rank has never been set, currentRank will be null.
						  return fbTeamCount = 0;
						});
					  }

					  });


			});  // end of the .$loaded .then








		/************************************ Outputting Other Teams Players From Dropdown **************************************/

		$scope.outputOtherTeam = function(teamName) {
			//console.log("$scope.usersReadyToDraft ", $scope.usersReadyToDraft);
			var filteredUser = [];
			filteredUser = _.filter($scope.usersReadyToDraft, ({"teamName": teamName}));

			$scope.filteredPlayers=[];
			//take filtered user,

			$firebaseArray(playerRef).$loaded()
			.then(function(listOfPlayers){
				var zPlayersList = listOfPlayers;

				//look at players associated with that user
				var newUserRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+ filteredUser[0].$id);
				$firebaseArray(newUserRef).$loaded()
				.then(function(playas){

					for(var i = 0; i< playas.length; i++){

						//id of player we are looking for is in playas[i].$id
						for(var p = 0; p < zPlayersList.length; p++){
							if(zPlayersList[p].$id === playas[i].$id && playas[i].$value === filteredUser[0].$id){

								$scope.filteredPlayers.push(zPlayersList[p]);
							}
						}


					}

					console.log("filteredPlayers", $scope.filteredPlayers);

				});

			});
			// output all players assc with that user
		};




		//NEW TESTING STUFFS
		$scope.startDraft = function() {

			if($scope.usersReadyToDraft[$scope.currentTeamCount].$id === currentUid){

				thisUserRef.update({"isTurn": true});
			}



		};

}]);


