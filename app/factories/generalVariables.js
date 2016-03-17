app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope",
	function($q, $http, $location, $rootScope) {

		var userUid;

		var ref = new Firebase("https://capstonefootball.firebaseio.com/");

		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");



		return {



			checkUserLogin : function(pathName){
          		ref.onAuth(function(authData) {

              		if (authData) {

              			userUid = authData.uid;

                		$location.path("/"+pathName);

              			} else {

                			$location.path("/splash");
              			}

           		});

      		},


			getUid: function() {

				return userUid;
			},

			setUid: function(value) {
				userUid = value;

			},

			logUserOut: function() {
				var authData = ref.getAuth();

				var newRef = new Firebase("https://capstonefootball.firebaseio.com/"+authData.uid);
				newRef.unauth();


				userRef.child("/"+userUid).update({"online": false});


			},

			setPlayers: function(guy) {
				playersList.push(guy);

			},

			getPlayers: function() {

				return playersList;
			}

		};



}]);


