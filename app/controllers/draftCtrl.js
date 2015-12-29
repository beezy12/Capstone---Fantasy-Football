app.controller('draftCtrl', ["$scope", "$q", "$http", "$firebaseArray", "$firebaseObject", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $firebaseObject, generalVariables) {

		// generalVariables.setHeight();

		window._ = _;


		// use this to 
		// $rootscope.userCanChoose = true;
		// if this is true, ng-disabled = falsey or something like that
		// disable the zplayerlist div



		// $scope.users  = [
		// 	{
		// 		name: "Luke",
		// 		id: "fdkjsfhadsufhkasdjfhkas",
		// 		order: "first"
		// 	},
		// 	{
		// 		name: "Joe",
		// 		id: "jdsfjaian,wdsg",
		// 		order: "last"
		// 	}
		// ];

		generalVariables.checkUserLogin('draft');
		
		// get the logged in userId and set it to var currentUid
		var currentUid = generalVariables.getUid();
		// console.log("currentUid that gets logged when draft page loads ----->", currentUid);


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
		
		//var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList/"+generalVariables.getUid()+"/");
			//console.log("heeeeeeereee is the draftlist child attempt ------_>", draftRef);

		var onlineRef = new Firebase("https://capstonefootball.firebaseio.com/user");

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
			//console.log("teamPlayersRef.child($scope.modalPlayer.$id) -----> here", teamPlayersRef);

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

		
		
		// here is where I keep track of what teams are online
		
		$scope.usersReadyToDraft = [];
		//console.log("$scope.usersReadyToDraft array right here", $scope.usersReadyToDraft);

		var onlineArray = $firebaseArray(onlineRef);

		onlineArray
			.$loaded()
			.then(function(online) {
				$scope.onlineUsers = online;
				// *********** had this as $scope.onlineUsers = onlineArray.....but that didn't seem 
				// right. So I changed it to just say online....so now Im using the promise.

				//console.log("$scope.onlineUsers READY", $scope.onlineUsers);

				for (var i = 0; i < $scope.onlineUsers.length; i++) {
					if ($scope.onlineUsers[i].online === true) {
						
						$scope.usersReadyToDraft.push($scope.onlineUsers[i]);
						console.log("$scope.usersReadyToDraft =======>>>", $scope.usersReadyToDraft);
						// console.log("online users team name ------>>>>", $scope.onlineUsers[i].teamName);
					}
				}


				onlineArray.$watch(function(snapshot) { 
					console.log("sneeepshot", snapshot);

					if(snapshot.event === "child_changed") {
						//if child changed
							//take the uid of child changed
							//go into firebase users object/ then into child object with the uid of child changed
							//get that object
							// if online = true
								//push object into $scope.usersReadyToDraft array
							//else
								//(this else will fire if online is = false)
								//log this user aint online



					}
				});

				console.log("users online", $scope.usersReadyToDraft);

			});  // end of the .$loaded .then

		

		$scope.outputOtherTeam = function(teamName){
			//console.log("$scope.usersReadyToDraft ", $scope.usersReadyToDraft);
			var filteredUser = [];
			var filteredUser = _.filter($scope.usersReadyToDraft, ({"teamName": teamName}));
			console.log("filteredUser =====>>>>", filteredUser);
			$scope.filteredPlayers=[];
			//take filtered user,
			console.log("filtered users id", filteredUser[0].$id );
			$firebaseArray(playerRef).$loaded()
			.then(function(listOfPlayers){
				var zPlayersList = listOfPlayers;

				//look at players associated with that user
				var newUserRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers/"+ filteredUser[0].$id);
				$firebaseArray(newUserRef).$loaded()
				.then(function(playas){
					console.log("playas ", playas);
					for(var i = 0; i< playas.length; i++){
						console.log("plays[i]", playas[i]);
						//id of player we are looking for is in playas[i].$id
						for(var p = 0; p < zPlayersList.length; p++){
							if(zPlayersList[p].$id === playas[i].$id && playas[i].$value === filteredUser[0].$id){
								console.log("we have a matches ", playas[i]);
								$scope.filteredPlayers.push(zPlayersList[p]);
							}
						}


					}

					console.log("filteredPlayers", $scope.filteredPlayers);

				});

			});
			// output all players assc with that user
				

		}
			

			
		


				
}]);




			




			
								
		


							
							
											
											

