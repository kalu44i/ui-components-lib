'use strict';

/**
 * @ngdoc directive
 * @name tagsViewer
 * @module ngTagsRow
 *
 * @description
 * Renders a list of tags and shows them in one row. The tags which can't be filled cause there is no no width, it puts them
 * into list under dropdown tag at the end of list of tags.
 * It has a feature to not show delete icon on a tag. Specify "removeOff":true parameter for the tag object.
 *
 * Example:
 * You have a list of 10 objects: Your container can contain only 3 tags and dropdown tag.
 *
 * ||TagName1| |TagName2| |TagName3| |+7 more||
 *
 * Clicking on the +7 more tag, the dropdown with list opens.
 *
 * The model for tag:
 * {
     *     "text": "Tag Text", (required)
     *     "tooltip": "Tooltip Text",
     *     "removeOff": "true/false"
     * }
 *
 * @param {string} ngModel Assignable Angular expression to data-bind to.
 * @param {string=} [tagClass=] Css class which applies to the tags.
 * @param {string=} [removeButtonClass=NA] Css class which applies to the remove buttons. Applies to the remove
 * buttons on the visible tags and on the element in the dropdown's list.
 * @param {expression=} [onTagRemoved=NA] Expression to evaluate upon removing an existing tag. The removed tag is available as $tag.
 * @param {boolean=} [tooltipOn=false] Flag indicating that tooltip shows while hovering on the tag. Requires a
 * property "tooltip" with the value to show.
 *
 */
angular.module('ngTagsRow', []).directive('tagsViewer', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel',
            tagClass: '@',
            removeButtonClass: '@',
            onTagRemoved: '&?',
            tooltipOn: '@?'
        },
        templateUrl: '/ng-tags-row.html',
        replace: false,
        transclude: true,
        link: function (scope) {
            scope.tagIdPrefix = "tag_";

            scope.lastMainIndex = 0;
            scope.show = false;
            scope.tagsForShow = [];
            scope.tagsForDropdown = [];

            var setVisAndPos = function (visibility, position) {
                angular.element(".mainContainer").css("visibility", visibility);
                angular.element(".mainContainer").css("position", position);
            };

            var spliceNoMutate = function(array, indexToRemove) {
                return array.slice(0,indexToRemove).concat(array.slice(indexToRemove+1));
            };

            scope.calculateTags = function () {
                console.log("Calculate tags");
                scope.tagsForShow = scope.tags.slice(0, 10);
                scope.tagsForDropdown = scope.tags;

                setTimeout(function () {
                    var sum = 0;
                    var tagsBlockWidth = angular.element(".mainContainer").innerWidth() -
                        angular.element(".dropdownContainer").outerWidth(true);

                    for (var i = 0; i < scope.tagsForShow.length; i++) {
                        var id = "#" + scope.tagIdPrefix + i;
                        var tagWidth = angular.element(id).outerWidth(true);
                        var tmpSum = sum + tagWidth;
                        if (tmpSum <= tagsBlockWidth) {
                            sum = tmpSum;
                            scope.lastMainIndex = i;
                        } else {
                            break;
                        }
                    }

                    scope.show = true;

                    scope.$apply(function () {
                        scope.tagsForShow = scope.tags.slice(0, scope.lastMainIndex + 1);
                        scope.tagsForDropdown = scope.tags.slice(scope.lastMainIndex + 1, scope.tags.length);
                    });

                    setVisAndPos("visible", "unset");
                }, 0);
            };

            scope.$removeTag = function (tag, index, isMainTag) {
                console.log("Remove tag");
                setVisAndPos("hidden", "absolute");
                if (isMainTag) {
                    scope.tags = spliceNoMutate(scope.tags, index);
                    // scope.tags.splice(index, 1);
                } else {
                    scope.tags = spliceNoMutate(scope.tags, index);
                    // scope.tags.splice(index + scope.lastMainIndex + 1, 1);
                }
                if (scope.onTagRemoved) {
                    scope.onTagRemoved({$tag: tag});
                }
            };

            scope.$watch("tags", function () {
                scope.calculateTags();
            });

            scope.getTagClass = function () {
                return scope.tagClass ? scope.tagClass : "tag-item";
            };

            scope.getRemoveButtonClass = function (tag) {
                if (tag.hasOwnProperty("removeOff") && !tag["removeOff"]) {
                    return "remove-button-hide";
                }
                return scope.removeButtonClass ? scope.removeButtonClass : "remove-button";
            };

            scope.getTagTooltip = function (tag) {
                return scope.tooltipOn ? tag.tooltip : '';
            };

            scope.calculateTags();
        }
    };
});