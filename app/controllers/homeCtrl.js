app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope) {
		
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userArray = $firebaseArray(userRef);
		console.log("userArray", userArray);




}]);