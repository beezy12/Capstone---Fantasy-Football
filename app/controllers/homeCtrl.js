app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {
		
		generalVariables.checkUserLogin('home');

		var currentUid = generalVariables.getUid();

		$scope.userTeams = '';
		$scope.usersOnline = [];

		$scope.userInfoHere = '';
        
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");
		$firebaseArray(userRef).$loaded()
		.then(function(usersHere) {
			console.log("usersHere ---->", usersHere);
			$scope.userTeams = usersHere;
			console.log("$scope.userTeams----", $scope.userTeams);

			for (var i = 0; i < $scope.userTeams.length; i++) {
				if ($scope.userTeams[i].online === true) {
					$scope.usersOnline.push($scope.userTeams);

				}
			}
					console.log($scope.usersOnline);
		});



		var userInfoRef = new Firebase("https://capstonefootball.firebaseio.com/user/"+currentUid);
		$firebaseArray(userInfoRef).$loaded()
		.then(function(userInfo) {
			console.log("userInfo ---->", userInfo);
			$scope.userInfoHere = userInfo;
		});








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