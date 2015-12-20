app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope",
	function($q, $http, $location, $rootScope) {

		var userUid;
		// var pathName;
		var ref = new Firebase("https://capstonefootball.firebaseio.com/");


		var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList");

		return {

			checkUserLogin : function(pathName){
          		ref.onAuth(function(authData) {
              		if (authData) {
                		console.log("Authenticated with uid:", authData.uid);
              			userUid = authData.uid;
                		$location.path("/"+pathName);
                		// $location.path("/home");
               			//if user is not logged in, redirect to login page
              			} else {
                			console.log("Client unauthenticated.");
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
				console.log("userUid is set", userUid);
			},

			logUserOut: function() {

				
				var authData = ref.getAuth();

				var newRef = new Firebase("https://capstonefootball.firebaseio.com/"+authData.uid);
				newRef.unauth();

				draftRef.child("/"+userUid).set({
						"online": false
					});

				console.log("user" + newRef + " was logged out");
			},

			// setHeight: function() {
			// 	$("body").css({"height":$(window).height()});
			// }

		};
	


	}]);