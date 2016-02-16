/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['amcharts/serial', 'jquery'], function(AmCharts, $) {
'use strict';

function tankLevel() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          value: '=',
          point: '=',
          options: '=?',
          max: '@',
          color: '@'
        },
        template: '<div class="amchart"></div>',
        link: function ($scope, $element, attributes) {
            if (!$('#tank-level-style').length) {
                $('<style>', {
                    id: 'tank-level-style',
                    type: 'text/css',
                    text: '.amcharts-graph-tank-remainder .amcharts-graph-column-bottom {display: none}'
                }).appendTo('head');
            }
            
            var options = defaultOptions();
            var max = 100.0;
            if ($scope.max) {
                max = parseFloat($scope.max);
            }
            if ($scope.color) {
                options.graphs[0].fillColors = $scope.color;
            }
            
            var chart = AmCharts.makeChart($element[0], $.extend(options, $scope.options));
            
            $scope.$watch('value', function(newValue, oldValue) {
                if (newValue === undefined) return;
                chart.dataProvider[0].tankLevel = newValue;
                chart.dataProvider[0].remainder = max - newValue;
                chart.validateData();
            });
            
            $scope.$watch('point.value', function(newValue, oldValue) {
                if (newValue === undefined) return;
                chart.dataProvider[0].tankLevel = newValue;
                chart.dataProvider[0].remainder = max - newValue;
                chart.dataProvider[0].renderedValue = $scope.point.renderedValue;
                chart.validateData();
            });
        }
    };
}

function defaultOptions() {
    return {
        type: "serial",
        theme: "light",
        addClassNames: true,
        dataProvider: [{
            tank: "tank1",
            remainder: 100.0,
            tankLevel: 0.0
        }],
        valueAxes: [{
            axisAlpha: 0.0,
            gridAlpha: 0.0,
            labelsEnabled: false,
            stackType: "100%"
        }],
        categoryAxis: {
            gridPosition: "start",
            axisAlpha: 0.0,
            gridAlpha: 0.0,
            labelsEnabled: false
        },
        depth3D: 100,
        angle: 30,
        startDuration: 0,
        graphs: [{
            id: "tank-level",
            type: "column",
            valueField: "tankLevel",
            balloonText: "",
            fillAlphas: 0.8,
            lineAlpha: 0.5,
            lineThickness: 2,
            columnWidth: 1,
            topRadius: 1,
            lineColor: '#cdcdcd',
            fillColors: "#67b7dc",
            //showOnAxis: true,
            //clustered: false,
            //labelText: "[[percents]] %",
            //labelPosition: "top"
        },{
            id: "tank-remainder",
            type: "column",
            valueField: "remainder",
            balloonText: "",
            fillAlphas: 0.3,
            lineAlpha: 0.5,
            lineThickness: 2,
            columnWidth: 1,
            topRadius: 1,
            lineColor: '#cdcdcd'
            //showOnAxis: true
        }],
        plotAreaFillAlphas: 0.0,
        categoryField: "tank",
        'export': {
            enabled: false
        }
    };
}

return tankLevel;

}); // define
