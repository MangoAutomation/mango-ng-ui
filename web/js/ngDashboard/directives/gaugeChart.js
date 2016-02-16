/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['amcharts/gauge', 'jquery'], function(AmCharts, $) {
'use strict';

function gaugeChart() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          value: '=',
          point: '=',
          options: '=?',
          start: '@',
          stop1: '@',
          stop2: '@',
          stop3: '@',
          interval: '@'
        },
        template: '<div class="amchart"></div>',
        link: function ($scope, $element, attributes) {
            var options = defaultOptions();
            if ($scope.start) {
                options.axes[0].startValue = parseFloat($scope.start);
            }
            if ($scope.stop1) {
                var stop1 = parseFloat($scope.stop1);
                options.axes[0].bands.push({
                    id: 'band1',
                    color: "#84b761",
                    startValue: options.axes[0].startValue,
                    endValue: stop1
                });
                options.axes[0].endValue = stop1;
            }
            if ($scope.stop2) {
                var stop2 = parseFloat($scope.stop2);
                options.axes[0].bands.push({
                    id: 'band2',
                    color: "#fdd400",
                    startValue: options.axes[0].endValue,
                    endValue: stop2
                });
                options.axes[0].endValue = stop2;
            }
            if ($scope.stop3) {
                var stop3 = parseFloat($scope.stop3);
                options.axes[0].bands.push({
                    id: 'band3',
                    color: "#cc4748",
                    startValue: options.axes[0].endValue,
                    endValue: stop3
                });
                options.axes[0].endValue = stop3;
            }
            if ($scope.interval) {
                options.axes[0].valueInterval = parseFloat($scope.interval);
            }

            var chart = AmCharts.makeChart($element[0], $.extend(options, $scope.options));
            
            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue === undefined) return;
                chart.arrows[0].setValue(newValue);
                chart.axes[0].setBottomText(newValue.toFixed(2));
            });
            
            $scope.$watch('point.value', function(newValue, oldValue) {
                if (newValue === undefined) return;
                chart.arrows[0].setValue(newValue);
                chart.axes[0].setBottomText($scope.point.renderedValue);
            });
        }
    };
}

function defaultOptions() {
    return {
        type: "gauge",
        theme: "light",
        addClassNames: true,
        axes: [{
            axisThickness: 1,
            axisAlpha: 0.5,
            tickAlpha: 0.5,
            startValue: 0,
            endValue: 100,
            bands: [],
            bottomText: "",
            bottomTextYOffset: -20
        }],
        arrows: [{}]
    };
}

return gaugeChart;

}); // define
