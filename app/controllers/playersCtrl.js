app.controller('playersCtrl', ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {

		generalVariables.checkUserLogin('players');

		$scope.playersList = generalVariables.getPlayers();
		console.log("trying to get players to playersCtrl here", $scope.playersList);


	}]);