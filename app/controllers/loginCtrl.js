app.controller("loginCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "generalVariables", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $location, generalVariables, $rootScope) {


		$scope.loginEmail = "";
		$scope.loginPassword = "";
		$scope.firstName = "";
		$scope.lastName = "";
		var currentUid;

		var ref = new Firebase("https://capstonefootball.firebaseio.com/user");
		console.log("ref is ", ref);

		var teamsRef = new Firebase("https://capstonefootball.firebaseio.com/teams");
		console.log("teamsRef: ", teamsRef);

		var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList");

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
						"teamName": $scope.teamName
					});

					
					teamsRef.push({
						"teamName": $scope.teamName,
						"userId": currentUid
					});

					draftRef.child("/"+userData.uid).push({
						"teamName": $scope.teamName,
						"online": true
					});
						

					$location.path('/home');
					$rootScope.$apply();
				}
			});
		};


	// playerRef.child($scope.modalPlayer.$id).child("drafted").set(true);


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


			// when user logs in, set online to true. when logging out, set online to false.

					// draftRef.child("/"+authData.uid).set({
					// 	"playersHere": $scope.teamName
					// });

					$location.path('/home');
					$rootScope.$apply();
				}
				

			});
		};

		// generalVariables.checkUserLogin();
		// console.log("method checkUserLogin fired....not sure if it's in the right spot");

		$scope.logout = function() {
			generalVariables.logUserOut();
			console.log("heard the logout here in loginCtrl");
		};





	}]);



