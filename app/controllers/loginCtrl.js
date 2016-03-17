app.controller("loginCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "generalVariables", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $location, generalVariables, $rootScope) {


		$scope.loginEmail = "";
		$scope.loginPassword = "";
		$scope.firstName = "";
		$scope.teamName = "";

		var currentUid;



		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");


		var teamsRef = new Firebase("https://capstonefootball.firebaseio.com/teams");


		var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList");

		$scope.registerUser = function() {
			userRef.createUser({
				email: $scope.loginEmail || $scope.registerEmail,
				password: $scope.loginPassword || $scope.registerPassword
			}, function(error, userData) {
				if (error) {

				} else {

					currentUid = userData.uid;


					generalVariables.setUid(userData.uid);



					userRef.child("/"+userData.uid).set({
						"firstName": $scope.firstName,
						"teamName": $scope.teamName,
						"online": true,
						"isTurn": false
					});


					$location.path('/home');
					$rootScope.$apply();
				}
			});
		};



		$scope.loginUser = function() {


			userRef.authWithPassword({
				email: $scope.loginEmail,
				password: $scope.loginPassword
			}, function(error, authData) {
					if (error) {

					} else {

						generalVariables.setUid(authData.uid);

						userRef.child("/"+authData.uid).child("online").set(true);
						userRef.child("/"+authData.uid).child("isTurn").set(false);

						$location.path('/home');
						$rootScope.$apply();
					}
				},
			{
				remember: "sessionOnly"
			});
		};

}]);






