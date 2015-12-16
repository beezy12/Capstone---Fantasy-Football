app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {
		
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userArray = $firebaseArray(userRef);
		console.log("userArray", userArray);

		generalVariables.checkUserLogin();
		console.log("method checkUserLogin fired....not sure if it's in the right spot");


}]);