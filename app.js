'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngTagsRow',
    'ui.bootstrap'
]).controller("MyCtrl", ['$scope', function($scope) {
        $scope.tagText = "";

        $scope.cities =
            [
                {"text":"New York", "tooltip":"State: New York\nPopulation: 3 900 900"},
                {"text":"San Francisco", "tooltip":"State: California\nPopulation: 852,469"},
                {"text":"Los Angeles", "tooltip":"State: California\nPopulation: 3,928,864"},
                {"text":"Philadelphia", "tooltip":"State: Pennsylvania\nPopulation: 3 900 900"},
                {"text":"Indianapolis", "tooltip":"State: Indiana\nPopulation: 3 900 900"},
                {"text":"Columbus", "tooltip":"State: Ohio\nPopulation: 3 900 900"},
                {"text":"Denver", "tooltip":"State: Colorado\nPopulation: 3 900 900"},
                {"text":"Seattle", "tooltip":"State: Washington\nPopulation: 3 900 900"},
                {"text":"San Jose", "tooltip":"State: California\nPopulation: 3 900 900"},
                {"text":"Detroit", "tooltip":"State: Michigan\nPopulation: 3 900 900"},
                {"text":"San Antonio", "tooltip":"State: Texas\nPopulation: 3 900 900"},
                {"text":"Phoenix", "tooltip":"State: Arizona\nPopulation: 3 900 900"}
            ];

        $scope.remove = function (tag) {
            $scope.tagText = "You deleted " + tag.text + " tag";
        }
    }]);
