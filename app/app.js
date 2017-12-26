'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngTagsRow',
    'ngRoute',
    'ui.bootstrap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])
    .controller("MyCtrl", ['$scope', function($scope) {
        $scope.tags =
            [
                {"text":"tagTrace1"},
                {"text":"tagTrace2"},
                {"text":"tagTrace3"},
                {"text":"tagTrace12"},
                {"text":"tagTrace22"},
                {"text":"tagTrace32"}
            ]
    }]);
