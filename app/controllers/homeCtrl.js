app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {
		

		var ref = new Firebase("https://capstonefootball.firebaseio.com");

		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userArray = $firebaseArray(userRef);
		

		generalVariables.checkUserLogin('home');




		$scope.logout = function() {
			// console.log("getting that click for logging out");
			// // get authdata object by calling firebase method on reference created up top
			// var authData = ref.getAuth();

			// // construct new firebase reference to user data location
			// var logRef = new Firebase("https://capstonefootball.firebaseio.com/user/"+authData.uid);

			// // unauthorize user location
			// logRef.unauth();
			// console.log("heard the logout here in loginCtrl");



			generalVariables.logUserOut();
		};


		// logout functionality
		// logout: function() {
			
		// 	// get authdata object by calling firebase method on reference created up top
		// 	var authData = ref.getAuth();
			
		// 	// construct new firebase reference to user data location
		// 	var userRef = new Firebase("https://movieshistory.firebaseio.com/users/" + authData.uid);

		// 	// unauthorize user location
		// 	userRef.unauth();
			
		// 	// display splash screen
		// 	templates.loadSplash();
			
		// } // end of logout
		


}]);