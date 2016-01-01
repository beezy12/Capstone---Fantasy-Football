app.controller("loginCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "generalVariables", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $location, generalVariables, $rootScope) {


		$scope.loginEmail = "";
		$scope.loginPassword = "";
		$scope.firstName = "";
		$scope.teamName = "";
		var currentUid;

		

		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");
		//console.log("userRef is ", userRef);

		var teamsRef = new Firebase("https://capstonefootball.firebaseio.com/teams");
		//console.log("teamsRef: ", teamsRef);

		var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList");

		$scope.registerUser = function() {
			userRef.createUser({
				email: $scope.loginEmail || $scope.registerEmail,
				password: $scope.loginPassword || $scope.registerPassword
			}, function(error, userData) {
				if (error) {
					console.log("you messed up something", error);
				} else {
					//console.log("userData check-----", userData);
					console.log("you made a profile with user Id of: ", userData.uid);
					currentUid = userData.uid;
					//console.log("currentUid", currentUid);

					generalVariables.setUid(userData.uid);



					userRef.child("/"+userData.uid).set({
						"firstName": $scope.firstName,
						"teamName": $scope.teamName,
						"online": true
					});

					
					// teamsRef.set({
					// 	"teamName": $scope.teamName,
					// 	"userId": userData.uid
					// });

					// draftRef.child("/"+userData.uid).set({
					// 	"teamName": $scope.teamName,
					// 	"online": true
					// });
						

					$location.path('/home');
					$rootScope.$apply();
				}
			});
		};


	// playerRef.child($scope.modalPlayer.$id).child("drafted").set(true);


		$scope.loginUser = function() {
			//console.log("hear that ol sign in button being clicked");

			userRef.authWithPassword({
				email: $scope.loginEmail,
				password: $scope.loginPassword
			}, function(error, authData) {
					if (error) {
						console.log("you done messed up", error);
					} else {

						//console.log("user logged in successfully with payload: ", authData);
						
						generalVariables.setUid(authData.uid);


			

						userRef.child("/"+authData.uid).child("online").set(true);
						// 	"playersHere": $scope.teamName
						// });

						$location.path('/home');
						$rootScope.$apply();
					}
				},
			{
				remember: "sessionOnly"
			});
		};

		// generalVariables.checkUserLogin();
		// console.log("method checkUserLogin fired....not sure if it's in the right spot");




}]);



