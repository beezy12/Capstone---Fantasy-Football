app.controller("homeCtrl", ["$scope", "$q", "$http", "$firebaseArray", "$location", "$rootScope",
	function($scope, $q, $http, $firebaseArray, $location, $rootScope) {
		
		var userRef = new Firebase("https://capstonefootball.firebaseio.com/user");

		var userArray = $firebaseArray(userRef);
		console.log("userArray", userArray);


		// $scope.goHome = function() {
		// 	$location.path('/home');
		// 	$rootScope.$apply();
		// };

		// $scope.goTeam = function() {
		// 	$location.path('/team');
		// 	$rootScope.$apply();
		// };

		// $scope.goPlayers = function() {
		// 	$location.path('/players');
		// 	$rootScope.$apply();
		// };

		// $scope.goDraft = function() {
		// 	$location.path('/draft');
		// 	$rootScope.$apply();
		// };


	}]);