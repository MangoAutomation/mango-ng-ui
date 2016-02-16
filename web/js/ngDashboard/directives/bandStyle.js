/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define([], function() {
'use strict';

function bandStyle() {
    return {
        restrict: 'E',
        scope: {
            value: '=?',
            
            band1Limit: '@',
            band2Limit: '@',
            band3Limit: '@',
            band4Limit: '@',
            band5Limit: '@',
            
            band1Style: '=?',
            band2Style: '=?',
            band3Style: '=?',
            band4Style: '=?',
            band5Style: '=?',
            band6Style: '=?'
        },
        replace: true,
        transclude: true,
        template: '<span ng-transclude ng-style="style"></span>',
        controller: function ($scope, $element) {
            $scope.$watch('value', function() {
                var val = $scope.value;
                if (val === undefined || val === null)
                    return;
                
                var style;
                if (val < $scope.band1Limit) {
                    style = $scope.band1Style;
                } else if (val < $scope.band2Limit) {
                    style = $scope.band2Style;
                } else if (val < $scope.band3Limit) {
                    style = $scope.band3Style;
                } else if (val < $scope.band4Limit) {
                    style = $scope.band4Style;
                } else if (val < $scope.band5Limit) {
                    style = $scope.band5Style;
                } else {
                    style = $scope.band6Style || $scope.band5Style || $scope.band4Style ||
                        $scope.band3Style || $scope.band2Style || $scope.band1Style;
                }
                
                $scope.style = style;
            });
        }
    };
}

return bandStyle;

}); // define
