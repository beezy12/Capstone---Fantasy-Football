app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", 
	function($scope, $q, $http, $firebaseArray) {
		
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userArray = $firebaseArray(userRef);
		console.log("userArray", userArray);


	}]);