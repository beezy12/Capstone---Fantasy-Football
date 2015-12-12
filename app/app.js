var app = angular.module("footballGurus", 
	['firebase', 'ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/splash', {
				templateUrl: './app/partials/splash.html',
				controller: 'loginCtrl'
			});
	}]);