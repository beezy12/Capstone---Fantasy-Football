app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope",
	function($q, $http, $location, $rootScope) {

		var userUid;


		return {
			getUid: function() {
				return userUid;
			},

			setUid: function(value) {
				userUid = value;
			},

			logUserOut: function() {
				var ref = new Firebase("https://capstonefootball.firebaseio.com/");
				ref.unauth();
				// $location.path('/splash');
				// $rootScope.$apply();
				console.log("user" + ref + " was logged out");
			}


		};
	


	}]);