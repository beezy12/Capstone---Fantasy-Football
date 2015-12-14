app.factory("generalVariables", ["$q", "$http", "$location", 
	function($q, $http, $location) {

		var userUid;


		return {
			getUid: function() {
				return userUid;
			},

			setUid: function(value) {
				userUid = value;
			}

			
		};
	


	}]);