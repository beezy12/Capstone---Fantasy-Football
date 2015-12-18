app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {
		
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userArray = $firebaseArray(userRef);
		

		generalVariables.checkUserLogin('home');
		


}]);