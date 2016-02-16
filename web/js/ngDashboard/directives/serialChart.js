/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['amcharts/serial', 'jquery', 'moment'], function(AmCharts, $, moment) {
'use strict';

function serialChart() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          series1Values: '=',
          series1Type: '@',
          series1Title: '@',
          series1Color: '@',
          series2Values: '=',
          series2Type: '@',
          series2Title: '@',
          series2Color: '@',
          series3Values: '=',
          series3Type: '@',
          series3Title: '@',
          series3Color: '@',
          series4Values: '=',
          series4Type: '@',
          series4Title: '@',
          series4Color: '@',
          options: '=?',
          categoryFormat: '@',
          stackType: '@'
        },
        template: '<div class="amchart"></div>',
        link: function ($scope, $element, attributes) {
            var options = defaultOptions();

            if ($scope.categoryFormat) {
                options.categoryAxis.parseDates = false;
            }
            
            if ($scope.stackType) {
                options.valueAxes[0].stackType = $scope.stackType;
            }
            
            options = $.extend(options, $scope.options);
            
            var chart = AmCharts.makeChart($element[0], options);
            
            /*
            $scope.$watchCollection('values', function(newValue, oldValue) {
                if (newValue === undefined) return;
                chart.dataProvider = newValue;
                chart.validateData();
            });
            */
            
            $scope.$watchCollection('series1Values', function(newValue, oldValue) {
                if (!newValue) removeGraph(1);
                else setupGraph(1);
                updateValues();
            });
            
            $scope.$watchCollection('series2Values', function(newValue, oldValue) {
                if (!newValue) removeGraph(2);
                else setupGraph(2);
                updateValues();
            });
            
            $scope.$watchCollection('series3Values', function(newValue, oldValue) {
                if (!newValue) removeGraph(3);
                else setupGraph(3);
                updateValues();
            });
            
            $scope.$watchCollection('series4Values', function(newValue, oldValue) {
                if (!newValue) removeGraph(4);
                else setupGraph(4);
                updateValues();
            });
            
            function removeGraph(graphNum) {
                for (var i = 0; i < chart.graphs.length; i++) {
                    if (chart.graphs[i].valueField === "value" + graphNum) {
                        chart.graphs.splice(i, 1);
                        break;
                    }
                }
            }
            
            function findGraph(graphNum) {
                var graph;
                for (var i = 0; i < chart.graphs.length; i++) {
                    if (chart.graphs[i].id === "series-" + graphNum) {
                        graph = chart.graphs[i];
                        break;
                    }
                }
                return graph;
            }
            
            function setupGraph(graphNum) {
                var graph = findGraph(graphNum);
                
                var graphType = $scope['series' + graphNum + 'Type'];
                if (!graphType) graphType = 'smoothedLine';
                
                if (!graph) {
                    graph = graphType === 'column' ? defaultColumnGraph(graphNum) : defaultLineGraph(graphNum);
                    chart.graphs.push(graph);
                }
                graph.valueField = 'value' + graphNum;
                graph.title = $scope['series' + graphNum + 'Title'] || ('Series ' + graphNum);
                graph.type = graphType;
                graph.lineColor = $scope['series' + graphNum + 'Color'] || null;
                
                chart.graphs.sort(function(a, b) {
                    if (a.id < b.id)
                        return -1;
                      if (a.id > b.id)
                        return 1;
                      return 0;
                });
            }
            
            function combine(output, newValues, valueField) {
                if (!newValues) return;
                
                for (var i = 0; i < newValues.length; i++) {
                    var value = newValues[i];
                    var category = $scope.categoryFormat ?
                            moment(value.timestamp).format($scope.categoryFormat) :
                            value.timestamp;
                    
                    if (!output[category]) {
                        output[category] = {category: category};
                    }
                    
                    output[category][valueField] = value.value;
                }
            }
            
            function updateValues() {
                var values1 = $scope.series1Values;
                var values2 = $scope.series2Values;
                var values3 = $scope.series3Values;
                var values4 = $scope.series4Values;
                
                var values = $scope.categoryFormat ? {} : [];
                
                combine(values, values1, 'value1');
                combine(values, values2, 'value2');
                combine(values, values3, 'value3');
                combine(values, values4, 'value4');
                
                // normalize sparse array or object into dense array
                var output = [];
                for (var category in values) {
                    output.push(values[category]);
                }
                
                // XXX sparse array to dense array doesnt result in sorted array
                // manually sort here
                if (output.length && typeof output[0].category === 'number') {
                    output.sort(function(a,b) {
                        return a.category - b.category;
                    });
                }
                
                chart.dataProvider = output;
                chart.validateData();
            }
        }
    };
}

function defaultLineGraph(graphNum) {
    return {
        id: "series-" + graphNum,
        fillAlphas: 0,
        lineAlpha: 0.8,
        lineThickness: 2.0
    };
}

function defaultColumnGraph(graphNum) {
    return {
        id: "series-" + graphNum,
        fillAlphas: 0.8,
        lineAlpha: 0.9,
        lineThickness: 1
    };
}

function defaultOptions() {
    return {
        type: "serial",
        theme: "light",
        addClassNames: true,
        dataProvider: [],
        valueAxes: [{
            position: "left"
        }],
        categoryAxis: {
            parseDates: true,
            minPeriod: 'fff',
            equalSpacing: true
        },
        startDuration: 0,
        graphs: [],
        plotAreaFillAlphas: 0.0,
        categoryField: "category",
        'export': {
            enabled: false
        }
    };
}

return serialChart;

}); // define
