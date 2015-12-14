app.controller("loginCtrl", ["$scope", "$q", "$http", "$firebaseArray", 
	function($scope, $q, $http, $firebaseArray) {


		$scope.registerMe = function() {
			console.log("hear ya register button");
		};

		$scope.signMeIn = function() {
			console.log("hear that ol sign in button being clicked");
		};
	}]);