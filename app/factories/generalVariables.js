app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope", "$firebaseArray",
	function($q, $http, $location, $rootScope, $firebaseArray) {

		console.log("factory is loading all the sheeeeeeeiiiitttt");

		var userUid;
		console.log("the current person isssssss: ", userUid);
		
		var ref = new Firebase("https://capstonefootball.firebaseio.com/");
		
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var teamPlayersRef = new Firebase("https://capstonefootball.firebaseio.com/teamPlayers"+userUid);
		console.log("teamPlayersRef", teamPlayersRef);

		var playerRef = new Firebase ("https://capstonefootball.firebaseio.com/zplayersList");

		// var playersList = [];
		// console.log("playersList in factory ********", playersList);

		function getUserIdPromise(id) {
			// does promise stuff and returns user id
			return $q(function(resolve) {
				if (id) {
					resolve(personsId);
				}
			});
		}
		



		var promise = getUserIdPromise(userUid);
		console.log("promise", promise);
			promise.then(function() {
				getUsersPlayers(userUid);
		});

		

		// *****USERID IS CALLED CURRENTUID BELOW
		var allListedPlayers = [];
		console.log("allListedPlayers", allListedPlayers);

		function getUsersPlayers(currentUid) {
			// go get all those players (using the userId);

			console.log("allListedPlayers in the factory ======>>>>", allListedPlayers);
			// watches for changes to firebase teamPlayers object (which is now an array)
			var teamPlayersArray = $firebaseArray(teamPlayersRef);
			console.log("teamPlayersArray", teamPlayersArray);
			
				teamPlayersArray.$loaded()
					.then(function(draftedPlayers){
						

						$firebaseArray(playerRef).$loaded()
						.then(function(allPlayers) {
							

							for(var s = 0; s < draftedPlayers.length; s++) {
								for(var x = 0; x < allPlayers.length; x++) {

									if(draftedPlayers[s].$id ===  allPlayers[x].$id && draftedPlayers[s].$value === currentUid) {
										allListedPlayers.push(allPlayers[x]);

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
												allListedPlayers.push(index);
											}
										});
									});
								}


							});

							
						});

					});
		} // end of getPlayers function







		return {

			// MAYBE DO A PROMISE HERE TO FIX THE REGISTERING PROBLEM??

			checkUserLogin : function(pathName){
          		ref.onAuth(function(authData) {

          			console.log("THERE IS AUTHDATA DAMMIT =========");
          			console.log(authData);
              		if (authData) {
                		console.log("Im checking user login: Authenticated with uid:", authData.uid);
              			userUid = authData.uid;
              			console.log("userUid here in generalVariables", userUid);
                		$location.path("/"+pathName);
                
              			} else {
                			console.log("Client unauthenticated. why is it automatically doing this???");
                			$location.path("/splash");
              			}
              		
           		});

      		},
                 

			getUid: function() {
				console.log("uid is ", userUid);
				return userUid;
			},

			setUid: function(value) {
				userUid = value;
				//checkUserLogin(userUid);
				console.log("userUid is set", userUid);
			},

			logUserOut: function() {
				var authData = ref.getAuth();

				var newRef = new Firebase("https://capstonefootball.firebaseio.com/"+authData.uid);
				newRef.unauth();

				
				userRef.child("/"+userUid).update({"online": false});

				console.log("user" + newRef + " was logged out");
			},

			setPlayers: function(guy) {
				allListedPlayers.push(guy);
				//console.log("setting playersList here in generalVariables", playersList);
			},

			getPlayers: function() {
				console.log("calling getPlayers function in factory");
				return allListedPlayers;
			}

		};
	


}]);

				
