app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {
		

		// var ref = new Firebase("https://capstonefootball.firebaseio.com");

		$scope.userTeams = '';

		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");
		$firebaseArray(userRef).$loaded()
		.then(function(usersHere) {
			console.log("usersHere ---->", usersHere);
			$scope.userTeams = usersHere;
			console.log("$scope.userTeams----", $scope.userTeams);
		});

		// var userArray = $firebaseArray(userRef);
		//console.log("MADE IT TO HOMECTRL!!!!!");

		//generalVariables.getUid();
		generalVariables.checkUserLogin('home');



		// $scope.playersList = generalVariables.getPlayers();
		// console.log("what players did I get back???", $scope.playersList);

		$scope.logout = function() {
			generalVariables.logUserOut();
		};



		// get a ref to user in firebase
		// for loop through it and push team names to an empty array
		// ng-repeat through teams and output to dom
		// ng-click on a team, pass in value of team selected


		


}]);