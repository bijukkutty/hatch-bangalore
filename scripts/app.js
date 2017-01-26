'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

//var app = angular.module('myApp', []);
var app = angular.module('myApp', [
  'Authentication',
  'Home',
  'ngRoute',
  'ngCookies'
]);
app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'modules/authentication/views/login.html',
      hideMenus: true
    })

  .when('/', {
    controller: 'HomeController',
    templateUrl: 'views/index.html'
  })

  .when('/about', {
    controller: 'AboutController',
    templateUrl: 'views/about.html'
  })

	.when('/wayto', {
		controller: 'waytoController',
		templateUrl: 'views/wayto.html'
	})

	.when('/commongood', {
		controller: 'commonGoodController',
		templateUrl: 'views/commongood.html'
	})

	.when('/profile', {
		controller: 'profileController',
		templateUrl: 'views/profile.html'
	})

	.when('/register', {
		controller: 'RegisterController',
		templateUrl: 'modules/registration/views/registration.html'
	})
	//login redirections
  .otherwise({
    redirectTo: '/'
  });
}])

app.run(['$rootScope', '$location', '$cookieStore', '$http',
  function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // redirect to login page if not logged in
      var allowedPages = $.inArray($location.path(), ['/','#!', '/about', '/wayto', '/commongood', '/register']) === -1;
  	  var loggedIn = $rootScope.globals.currentUser;
  		if (allowedPages && !loggedIn) {
  			$location.path('/login');
  		  }
      });
  }
]);

app.controller('profileController', function($scope, $http){
	  $scope.createProfile = false;
    $scope.toggle = function() {
        $scope.createProfile = !$scope.createProfile;
    };
    var emailID = [];
    $http.post("http://35.161.138.102/src/public/userDetails.php/getUserDetailsByEmailId", {"emailID": emailID}).then(function (emailID) {
        $scope.profileData = response.data;
        console.logo(response);
    });

	/*profileFactory.getprofileData().then(
			function(response){
				  //$scope.profileData = response.data;
          console.log(response);
  			},
			function(err){
				console.log(err.status);
			}
		);*/
});


app.factory("profileFactory", function($http){
	return {
		getprofileData  : function(emailID){
			return $http.post("http://35.161.138.102/src/public/userDetails.php/getUserDetailsByEmailId", {"emailID": emailID})
    }
	}
});


app.controller('communityCtrl', function($scope, $http) {
  $http.get("json/community.json").then(function (response) {
      $scope.communityData = response.data.data;
  });
  $http.get("json/upcomingEvents.json").then(function (response) {
      $scope.upcomingEventsData = response.data.data;
  });
});
