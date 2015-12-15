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
			.when('/players', {
				templateUrl: './app/partials/players.html',
				controller: 'playersCtrl'
			});
	}]);



/* checklist:
	
		- when hover over draft player, add border and darken
		- when ng-click on player, pop up modal and ask if this is the player you want
		- when click 'yes' add player to team



*/