app.factory("generalVariables", ["$q", "$http", "$location", "$rootScope",
	function($q, $http, $location, $rootScope) {

		var userUid;
		// var pathName;
		var ref = new Firebase("https://capstonefootball.firebaseio.com/");

		var draftRef = new Firebase("https://capstonefootball.firebaseio.com/draftList");


		return {

			// MAYBE DO A PROMISE HERE TO FIX THE REGISTERING PROBLEM??

			checkUserLogin : function(pathName){
          		ref.onAuth(function(authData) {
          			console.log("THERE IS AUTHDATA DAMMIT =========");
              		if (authData) {
                		console.log("Im checking user login: Authenticated with uid:", authData.uid);
              			userUid = authData.uid;
              			console.log("userUid here in generalVariables", userUid);
                		$location.path("/"+pathName);
                
              			} else {
                			console.log("Client unauthenticated. why is it automatically doing this???");
                			$location.path("/splash");
              			}
           		});
      		},
                 

			getUid: function() {
				console.log("uid is ", userUid);
				return userUid;
			},

			setUid: function(value) {
				userUid = value;
				console.log("userUid is set", userUid);
			},

			logUserOut: function() {
				var authData = ref.getAuth();

				var newRef = new Firebase("https://capstonefootball.firebaseio.com/"+authData.uid);
				newRef.unauth();

				//draftRef.child("/"+userUid).set({
				draftRef.child("/"+userUid).update({"online": false});

				console.log("user" + newRef + " was logged out");
			},

			// setHeight: function() {
			// 	$("body").css({"height":$(window).height()});
			// }

		};
	


	}]);

				