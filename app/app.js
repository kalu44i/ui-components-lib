'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngTagsRow',
    'ui.bootstrap'
]).controller("MyCtrl", ['$scope', function($scope) {
        $scope.tags =
            [
                {"text":"tagTrace1"},
                {"text":"tagTrace2"},
                {"text":"tagTrace3"},
                {"text":"tagTrace12"},
                {"text":"tagTrace22"},
                {"text":"tagTrace32"},
                {"text":"tagTrace122"},
                {"text":"tagTrace222"},
                {"text":"tagTrace322"},
                {"text":"tagTrace1222"},
                {"text":"tagTrace2222"},
                {"text":"tagTrace3222"}
            ]
    }]);
