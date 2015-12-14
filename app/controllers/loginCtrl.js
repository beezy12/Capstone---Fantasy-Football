app.controller("loginCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "generalVariables", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $location, generalVariables, $rootScope) {


		$scope.loginEmail = "";
		$scope.loginPassword = "";
		$scope.firstName = "";
		$scope.lastName = "";
		var currentUid;

		var ref = new Firebase("https://capstonefootball.firebaseio.com/user");
		console.log("ref is ", ref);

		$scope.registerUser = function() {
			ref.createUser({
				email: $scope.loginEmail,
				password: $scope.loginPassword
			}, function(error, userData) {
				if (error) {
					console.log("you messed up something", error);
				} else {
					console.log("you made a profile with user Id of: ", userData.uid);
					currentUid = userData.uid;
					console.log("currentUid", currentUid);

					ref.child("/"+userData.uid).set({
						"firstName": $scope.firstName,
						"lastName": $scope.lastName
					});
				}
			});
		};

	// WHATS THE BEST WAY TO LOAD THE MAIN PAGE AFTER USER HAS REGISTERED OR LOGGED IN?????	


		$scope.loginUser = function() {
			console.log("hear that ol sign in button being clicked");

			ref.authWithPassword({
				email: $scope.loginEmail,
				password: $scope.loginPassword
			}, function(error, authData) {
				if (error) {
					console.log("you done messed up", error);
				} else {
					console.log("user logged in successfully with payload: ", authData);
				generalVariables.setUid(authData.uid);
				$location.path('/home');
				$rootScope.$apply();
				}
				console.log("authData.uid", authData.uid);

			});
		};
	}]);