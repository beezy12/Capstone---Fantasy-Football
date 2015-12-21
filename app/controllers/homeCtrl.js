app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {
		

		// var ref = new Firebase("https://capstonefootball.firebaseio.com");

		// var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		// var userArray = $firebaseArray(userRef);
		
		console.log("MADE IT TO HOMECTRL!!!!!");

		//generalVariables.getUid();
		generalVariables.checkUserLogin('home');




		$scope.logout = function() {
			generalVariables.logUserOut();
		};
		


}]);