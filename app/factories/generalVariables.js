app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope", 
	function($q, $http, $location, $rootScope) {

		var userUid;
		
		var ref = new Firebase("https://capstonefootball.firebaseio.com/");
		//var authData = ref.getAuth();
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		// var playersList = [];
		// console.log("playersList in factory ********", playersList);


		return {

			// MAYBE DO A PROMISE HERE TO FIX THE REGISTERING PROBLEM??

			checkUserLogin : function(pathName){
          		ref.onAuth(function(authData) {

          			// console.log("THERE IS AUTHDATA DAMMIT =========");
          			// console.log(authData);
              		if (authData) {
                		//console.log("Im checking user login: Authenticated with uid:", authData.uid);
              			userUid = authData.uid;
              			//console.log("userUid here in generalVariables", userUid);
                		$location.path("/"+pathName);
                
              			} else {
                			//console.log("Client unauthenticated. why is it automatically doing this???");
                			$location.path("/splash");
              			}
              		
           		});

      		},
                 

			getUid: function() {
				//console.log("uid is ", userUid);
				return userUid;
			},

			setUid: function(value) {
				userUid = value;
				//checkUserLogin(userUid);
				//console.log("userUid is set", userUid);
			},

			logUserOut: function() {
				var authData = ref.getAuth();

				var newRef = new Firebase("https://capstonefootball.firebaseio.com/"+authData.uid);
				newRef.unauth();

				
				userRef.child("/"+userUid).update({"online": false});

				//console.log("user" + newRef + " was logged out");
			},

			setPlayers: function(guy) {
				playersList.push(guy);
				console.log("setting playersList here in generalVariables", playersList);
			},

			getPlayers: function() {
				console.log("calling getPlayers function in factory");
				return playersList;
			}

		};
	


}]);

				
