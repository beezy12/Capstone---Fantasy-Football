app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope", "generalVariables",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope, generalVariables) {

		generalVariables.checkUserLogin('home');

		var currentUid = generalVariables.getUid();

		$scope.userTeams = '';
		$scope.usersOnline = [];

		$scope.userInfoHere = '';

		$scope.userTeamName = [];

		var onlineRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");
		$firebaseArray(userRef).$loaded()
		.then(function(usersHere) {

			$scope.userTeams = usersHere;


			for (var i = 0; i < $scope.userTeams.length; i++) {
				if ($scope.userTeams[i].online === true) {
					$scope.usersOnline.push($scope.userTeams);

				}
			}

		});



		var onlineArray = $firebaseArray(onlineRef);

		onlineArray
			.$loaded()
			.then(function(online) {
				$scope.onlineUsers = online;

				// *********** had this as $scope.onlineUsers = onlineArray.....but that didn't seem
				// right. So I changed it to just say online....so now Im using the promise.



				for (var i = 0; i < $scope.onlineUsers.length; i++) {

					if ($scope.onlineUsers[i].$id === currentUid) {
						$scope.userTeamName.push($scope.onlineUsers[i].teamName);
					}

				}


			});

		$scope.logout = function() {
			generalVariables.logUserOut();
		};

}]);
