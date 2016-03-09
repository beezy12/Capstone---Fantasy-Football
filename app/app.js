var app = angular.module("footballGurus",
	['firebase', 'ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/splash', {
				templateUrl: './app/partials/splash.html',
				controller: 'loginCtrl'
			})
			.when('/home', {
				templateUrl: './app/partials/leagueHome.html',
				controller: 'homeCtrl'
			})
			.when('/draft', {
				templateUrl: './app/partials/draftRoom.html',
				controller: 'draftCtrl'
			})
			.when('/team', {
				templateUrl: './app/partials/team.html',
				controller: 'teamCtrl'
			})
			.when('/players/:playerId', {
				templateUrl: './app/partials/usersTeams.html',
				controller: 'userTeamsCtrl'
			})
			.when('/players', {
				templateUrl: './app/partials/players.html',
				controller: 'playersCtrl'
			})
			.otherwise("/splash");
	}]);

