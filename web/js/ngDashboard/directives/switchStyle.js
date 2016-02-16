/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define([], function() {
'use strict';

function switchStyle() {
    return {
        restrict: 'E',
        scope: {
            value: '=?',
            
            case1Value: '@',
            case2Value: '@',
            case3Value: '@',
            case4Value: '@',
            case5Value: '@',
            case6Value: '@',
            
            case1Style: '=?',
            case2Style: '=?',
            case3Style: '=?',
            case4Style: '=?',
            case5Style: '=?',
            case6Style: '=?'
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
                if (val == $scope.case1Value) {
                    style = $scope.case1Style || {};
                } else if (val == $scope.case2Value) {
                    style = $scope.case2Style || {};
                } else if (val == $scope.case3Value) {
                    style = $scope.case3Style || {};
                } else if (val == $scope.case4Value) {
                    style = $scope.case4Style || {};
                } else if (val == $scope.case5Value) {
                    style = $scope.case5Style || {};
                } else if (val == $scope.case6Value) {
                    style = $scope.case6Style || {};
                }
                
                $scope.style = style || {};
            });
        }
    };
}

return switchStyle;

}); // define
