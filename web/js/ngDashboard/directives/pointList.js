/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define([], function() {
'use strict';

function pointList(Point) {
    return {
        restrict: 'E',
        scope: {
            order: '@'
        },
        template: '<select ng-options="pointLabel(point) for point in points | orderBy: orderArray track by point.id"></select>',
        replace: true,
        controller: function ($scope, $element) {
            $scope.orderArray = ['deviceName', 'name'];
            
            $scope.$watch('order', function() {
                if ($scope.order) {
                    $scope.orderArray = $scope.order.split(',');
                }
            });
            
            $scope.points = Point.query();
            $scope.pointLabel = function(point) {
                return point.deviceName + ' - ' + point.name;
            };
        }
    };
}

pointList.$inject = ['Point'];
return pointList;

}); // define
