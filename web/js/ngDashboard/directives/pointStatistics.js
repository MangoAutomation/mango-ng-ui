/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['angular', 'mango/api', 'moment-timezone'], function(angular, MangoAPI, moment) {
'use strict';

var baseUrl = MangoAPI.defaultApi.baseUrl;

function pointValues($http, $parse, Point) {
    return {
        restrict: 'E',
        scope: {
            point: '=?',
            pointXid: '@',
            statistics: '=',
            from: '=?',
            fromFilter: '@',
            to: '=?',
            toFilter: '@',
            refreshInterval: '@'
        },
        template: '<span style="display:none"></span>',
        replace: true,
        controller: function ($scope, $element) {
            function doQuery() {
                if (!$scope.point || !$scope.point.xid) return;
                
                var url = baseUrl = '/rest/v1/point-values/' + encodeURIComponent($scope.point.xid) +
                    '/statistics';
                var params = [];
                
                var now = moment();
                var from = toMoment($scope.from, now);
                var to = toMoment($scope.to, now);
                from = filterMoment(from, $scope.fromFilter);
                to = filterMoment(to, $scope.toFilter);
                
                if (from.valueOf() === to.valueOf()) return;
                
                params.push('from=' + encodeURIComponent(from.toISOString()));
                params.push('to=' + encodeURIComponent(to.toISOString()));
                params.push('useRendered=true');
                
                for (var i = 0; i < params.length; i++) {
                    url += (i === 0 ? '?' : '&') + params[i];
                }
                
                startRefreshTimer();
                
                var promise = $http.get(url, {
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(function(response) {
                    $scope.statistics = response.data;
                }, function() {
                    $scope.statistics = {};
                });
            }

            $scope.$watch('pointXid', function() {
                if (!$scope.pointXid || $scope.point) return;
                $scope.point = Point.get({xid: $scope.pointXid});
            });
            
            $scope.$watchGroup(['point.xid', 'from', 'to', 'fromFilter', 'toFilter'],
                    function(newValues, oldValues) {
                doQuery();
            }, true);
            
            function toMoment(input, now) {
                if (!input || input === 'now') return now;
                return moment(input);
            }
            
            function filterMoment(m, filterString) {
                if (!filterString) return m;
                var fn = $parse('date|' + filterString);
                var scope = {date: m};
                return fn(scope);
            }
            
            var timerId;
            function startRefreshTimer() {
                cancelRefreshTimer();
                if (!$scope.refreshInterval) return;
                
                var fromIsRelative = !$scope.from || $scope.from === 'now';
                var toIsRelative = !$scope.to || $scope.to === 'now';
                if (!fromIsRelative && !toIsRelative) return;
                
                var parts = $scope.refreshInterval.split(' ');
                if (parts.length < 2) return;
                
                var duration = moment.duration(parseFloat(parts[0]), parts[1]);
                var millis = duration.asMilliseconds();
                
                timerId = setInterval(function() {
                    $scope.$apply(function() {
                        doQuery();
                    });
                }, millis);
            }
            
            function cancelRefreshTimer() {
                if (timerId) {
                    clearInterval(timerId);
                    timerId = null;
                }
            }
            
            $scope.$on('$destroy', function() {
                cancelRefreshTimer();
            });
        }
    };
}

pointValues.$inject = ['$http', '$parse', 'Point'];
return pointValues;

}); // define
