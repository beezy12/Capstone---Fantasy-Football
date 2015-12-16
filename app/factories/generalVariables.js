app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope",
	function($q, $http, $location, $rootScope) {

		var userUid;

		var ref = new Firebase("https://capstonefootball.firebaseio.com/");

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
				var ref = new Firebase("https://capstonefootball.firebaseio.com/");
				ref.unauth();
				// $location.path('/splash');
				// $rootScope.$apply();
				console.log("user" + ref + " was logged out");
			},

			// setHeight: function() {
			// 	$("body").css({"height":$(window).height()});
			// }

		};
	


	}]);