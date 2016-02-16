/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['./services/Point',
        './services/PointEventManager',
        './directives/pointList',
        './directives/pointValue',
        './directives/pointValues',
        './directives/pointStatistics',
        './directives/bandStyle',
        './directives/switchStyle',
        './directives/tankLevel',
        './directives/gaugeChart',
        './directives/serialChart',
        './directives/pieChart',
        './directives/clock',
        './directives/stateChart',
        './filters/momentFilter',
        'angular',
        'angular-bootstrap',
        'angular-resource'
], function(Point, PointEventManager, pointList, pointValue, pointValues, pointStatistics,
        bandStyle, switchStyle, tankLevel, gaugeChart, serialChart, pieChart, clock, stateChart, momentFilter, angular) {
'use strict';

var ngDashboardApp = angular.module('ngDashboardApp', ['ui.bootstrap', 'ngResource']);

ngDashboardApp.factory('Point', Point);
ngDashboardApp.factory('PointEventManager', PointEventManager);
ngDashboardApp.directive('pointList', pointList);
ngDashboardApp.directive('pointValue', pointValue);
ngDashboardApp.directive('pointValues', pointValues);
ngDashboardApp.directive('pointStatistics', pointStatistics);
ngDashboardApp.directive('bandStyle', bandStyle);
ngDashboardApp.directive('switchStyle', switchStyle);
ngDashboardApp.directive('tankLevel', tankLevel);
ngDashboardApp.directive('gaugeChart', gaugeChart);
ngDashboardApp.directive('serialChart', serialChart);
ngDashboardApp.directive('pieChart', pieChart);
ngDashboardApp.directive('clock', clock);
ngDashboardApp.directive('stateChart', stateChart);
ngDashboardApp.filter('moment', momentFilter);

ngDashboardApp.run(['$rootScope', function($rootScope) {
    $rootScope.rollupTypes = [
        {type: 'NONE', nonNumeric: true, label: 'None'},
        {type: 'AVERAGE', nonNumeric: false, label: 'Average'},
        {type: 'DELTA', nonNumeric: false, label: 'Delta'},
        {type: 'MINIMUM', nonNumeric: false, label: 'Minimum'},
        {type: 'MAXIMUM', nonNumeric: false, label: 'Maximum'},
        {type: 'ACCUMULATOR', nonNumeric: false, label: 'Accumulator'},
        {type: 'SUM', nonNumeric: false, label: 'Sum'},
        {type: 'FIRST', nonNumeric: true, label: 'First'},
        {type: 'LAST', nonNumeric: true, label: 'Last'},
        {type: 'COUNT', nonNumeric: true, label: 'Count'},
        {type: 'INTEGRAL', nonNumeric: false, label: 'Integral'}
        //{name: 'FFT', nonNumeric: false}
    ];
    
    $rootScope.timePeriodTypes = [
          {type: 'SECONDS', label: 'Seconds'},
          {type: 'MINUTES', label: 'Minutes'},
          {type: 'HOURS', label: 'Hours'},
          {type: 'DAYS', label: 'Days'},
          {type: 'WEEKS', label: 'Weeks'},
          {type: 'MONTHS', label: 'Months'},
          {type: 'YEARS', label: 'Years'}
      ];
}]);

return ngDashboardApp;

}); // require
