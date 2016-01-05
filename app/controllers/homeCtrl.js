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



		// var userInfoRef = new Firebase("https://capstonefootball.firebaseio.com/user/"+currentUid);
		// $firebaseArray(userInfoRef).$loaded()
		// .then(function(userInfo) {
		// 	console.log("userInfo ---->", userInfo);
		// 	$scope.userInfoHere = userInfo;
		// });
		
		var onlineArray = $firebaseArray(onlineRef);

		onlineArray
			.$loaded()
			.then(function(online) {
				$scope.onlineUsers = online;
				console.log($scope.onlineUsers);
				// *********** had this as $scope.onlineUsers = onlineArray.....but that didn't seem 
				// right. So I changed it to just say online....so now Im using the promise.

				//console.log("$scope.onlineUsers READY", $scope.onlineUsers);

				for (var i = 0; i < $scope.onlineUsers.length; i++) {
					// if ($scope.onlineUsers[i].online === true) {
						
					// 	$scope.usersReadyToDraft.push($scope.onlineUsers[i]);
					// 	console.log("$scope.usersReadyToDraft =======>>>", $scope.usersReadyToDraft);

					// 	// prevPlayer = $scope.usersReadyToDraft[i - 1];
					// 	// console.log("====", prevPlayer);

					// 	// currentPlayer = $scope.onlineUsers;
					// 	// console.log("currentPlayer=======", currentPlayer);
					// 	// console.log("online users team name ------>>>>", $scope.onlineUsers[i].teamName);
					// }

					if ($scope.onlineUsers[i].$id === currentUid) {
						console.log($scope.onlineUsers[i].teamName);
						$scope.userTeamName.push($scope.onlineUsers[i].teamName);
					}

				}

				console.log("****OUHSENOUHTSOE*****", $scope.userTeamName);
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