/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define([], function() {
'use strict';

function pointValue($filter, pointEventManager, Point) {
    return {
        restrict: 'E',
        scope: {
            point: '=?',
            pointXid: '@',
            displayType: '@',
            dateTimeFormat: '@'
        },
        template: '<span>{{displayValue}}</span>',
        controller: function ($scope, $element) {
            function eventHandler(event, payload) {
                if (!(payload.event == 'UPDATE' || payload.event == 'REGISTERED')) return;
                if (payload.xid !== $scope.point.xid) return;
                
                var displayType = $scope.displayType || 'rendered';
                var displayValue = payload.value.value;
                var dateTimeFormat = $scope.dateTimeFormat || 'medium';
                
                switch(displayType) {
                case 'converted':
                    displayValue = payload.convertedValue; break;
                case 'rendered':
                    displayValue = payload.renderedValue; break;
                case 'dateTime':
                    displayValue = $filter('date')(payload.value.timestamp, dateTimeFormat); break;
                case 'none':
                    displayValue = '';
                }
                
                $scope.$apply(function() {
                    $scope.displayValue = displayValue;
                    
                    $scope.point.value = payload.value.value;
                    $scope.point.convertedValue = payload.convertedValue;
                    $scope.point.renderedValue = payload.renderedValue;
                    $scope.point.time = payload.value.timestamp;
                });
            }
            
            $scope.$watch('pointXid', function() {
                if (!$scope.pointXid || $scope.point) return;
                $scope.point = Point.get({xid: $scope.pointXid});
            });
            
            $scope.$watch('point.xid', function(newXid, oldXid) {
                if (oldXid) {
                    pointEventManager.unsubscribe(oldXid, 'UPDATE', eventHandler);
                }
                if (newXid) {
                    pointEventManager.subscribe(newXid, 'UPDATE', eventHandler);
                }
            });
            
            $scope.$on('$destroy', function() {
                if ($scope.point) {
                    pointEventManager.unsubscribe($scope.point.xid, 'UPDATE', eventHandler);
                }
            });
        },
        replace: true
    };
}

pointValue.$inject = ['$filter', 'PointEventManager', 'Point'];
return pointValue;

}); // define
