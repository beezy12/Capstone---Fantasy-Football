app.controller("loginCtrl", ["$scope", "$q", "$http", "$firebaseArray", 
	function($scope, $q, $http, $firebaseArray) {


		$scope.loginEmail = "";
		$scope.loginPassword = "";
		$scope.firstName = "";
		$scope.lastName = "";

		var ref = new Firebase("https://capstonefootball.firebaseio.com/user");
		console.log("ref is ", ref);

		$scope.registerUser = function() {
			ref.createUser({
				email: $scope.loginEmail,
				password: $scope.loginPassword
			}, function(error, userData) {
				if (error) {
					console.log("you messed up something");
				} else {
					console.log("you made a profile with user Id of: ", userData.uid);
					currentUid = userData.uid;
					console.log("currentUid", currentUid);

					ref.child("/"+userData.uid).set({
						"First Name": $scope.firstName,
						"Last Name": $scope.lastName
					});
				}
			});
		};

		


		$scope.signUserIn = function() {
			console.log("hear that ol sign in button being clicked");
		};
	}]);