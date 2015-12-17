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
		
		- after drafting player, remove him from list and add to the appropriate team
		  HOW DO I WATCH FIREBASE AND UPDATE TEAMS WITH THEIR DRAFTED PLAYERS????????????
		- create firebase object to store all teams logged in?
		- display all teams in draft boxes, highlight who's turn it is
		- display all drafting teams in a dropdown list in draft room to the right
		- get timer going
		- bug: if you only just registered and head to the draft room and pick a player, you are not logged in
		     you've got to go back out and log in for your picks to count
		
		



*/