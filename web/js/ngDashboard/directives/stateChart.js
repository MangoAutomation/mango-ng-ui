/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['amcharts/gantt', 'jquery', 'moment'], function(AmCharts, $, moment) {
'use strict';

function stateChart() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          series1Values: '=',
          series1Title: '@',
          series1Labels: '=',
          series2Values: '=',
          series2Title: '@',
          series2Labels: '=',
          series3Values: '=',
          series3Title: '@',
          series3Labels: '=',
          series4Values: '=',
          series4Title: '@',
          series4Labels: '=',
          options: '=?',
          endDate: '='
        },
        template: '<div class="amchart"></div>',
        link: function ($scope, $element, attributes) {
            var options = defaultOptions();
            
            options = $.extend(options, $scope.options);
            
            var chart = AmCharts.makeChart($element[0], options);

            $scope.$watchCollection('series1Values', function(newValue, oldValue) {
                if (!newValue) removeProvider(1);
                else setupProvider(1);
                updateValues();
            });
            
            $scope.$watchCollection('series2Values', function(newValue, oldValue) {
                if (!newValue) removeProvider(2);
                else setupProvider(2);
                updateValues();
            });
            
            $scope.$watchCollection('series3Values', function(newValue, oldValue) {
                if (!newValue) removeProvider(3);
                else setupProvider(3);
                updateValues();
            });
            
            $scope.$watchCollection('series4Values', function(newValue, oldValue) {
                if (!newValue) removeProvider(4);
                else setupProvider(4);
                updateValues();
            });
            
            function createLabelFn(input) {
                var labels;
                
                // we have been passed a point
                if (input && input.multistateValues) {
                    var msv = input.multistateValues;
                    labels = {};
                    for (var i = 0; i < msv.length; i++) {
                        labels[msv[i].key] = msv[i];
                    }
                } else {
                    // just use input as a map
                    labels = input;
                }
                
                return function(value) {
                    var label = labels && labels[value] || {};
                    
                    if (typeof label === 'string') {
                        label = {
                            text: label
                        };
                    }
                    
                    if (!label.text) {
                        label.text = value;
                    }
                    
                    return label;
                };
            }
            
            function removeProvider(graphNum) {
                for (var i = 0; i < chart.dataProvider.length; i++) {
                    if (chart.dataProvider[i].id === "series-" + graphNum) {
                        chart.dataProvider.splice(i, 1);
                        break;
                    }
                }
            }
            
            function findProvider(graphNum) {
                var graph;
                for (var i = 0; i < chart.dataProvider.length; i++) {
                    if (chart.dataProvider[i].id === "series-" + graphNum) {
                        graph = chart.dataProvider[i];
                        break;
                    }
                }
                return graph;
            }
            
            function setupProvider(graphNum) {
                var graph = findProvider(graphNum);
                
                if (!graph) {
                    graph = {
                        id: 'series-' + graphNum
                    };
                    chart.dataProvider.push(graph);
                }
                
                graph.category = $scope['series' + graphNum + 'Title'] || ('Series ' + graphNum);
                
                chart.dataProvider.sort(function(a, b) {
                    if (a.id < b.id)
                        return -1;
                      if (a.id > b.id)
                        return 1;
                      return 0;
                });
            }

            function updateValues() {
                var endDate = moment($scope.endDate);
                
                for (var i = 0; i < 4; i++) {
                    var graphNum = i+1;
                    var graph = findProvider(graphNum);
                    var values = $scope['series' + graphNum + 'Values'];
                    var labels = $scope['series' + graphNum + 'Labels'];
                    var labelFn = createLabelFn(labels);
                    
                    if (graph && values) {
                        var provider = [];
                        
                        var prevStartOfDay = 0;
                        
                        for (var j = 0; j < values.length; j++) {
                            var val = values[j];
                            var label = labelFn(val.value);
                            
                            // remove duplicates
                            while ((j+1) < values.length && values[j+1].value === val.value) {
                                values.splice(j+1, 1);
                            }
                            
                            var endTime = (j+1) < values.length ? values[j+1].timestamp : endDate.valueOf();
                            var duration = endTime - val.timestamp;
                            var startMoment = moment(val.timestamp);
                            var startOfDay = moment(val.timestamp).startOf('day').valueOf();
                            var startFormatted = startOfDay === prevStartOfDay ? startMoment.format('LTS') : startMoment.format('ll LTS');
                            prevStartOfDay = startOfDay;
                            
                            provider.push({
                                startDate: new Date(val.timestamp),
                                startFormatted: startFormatted,
                                endDate: new Date(endTime),
                                duration: moment.duration(duration).humanize(),
                                task: label.text,
                                colour: label.colour || getColour(val.value)
                            });
                        }
                        
                        graph.segments = provider;
                    }
                }
                chart.validateData();
            }
            
            var colourMap = {};
            var colourIndex = 0;
            function getColour(value) {
                if (colourMap[value]) {
                    return colourMap[value];
                }
                var colour = chart.colors[colourIndex++ % chart.colors.length];
                colourMap[value] = colour;
                return colour;
            }
        }
    };
}

function defaultOptions() {
    return {
        type: "gantt",
        theme: "light",
        columnWidth: 0.7,
        valueAxis: {
            type: "date"
        },
        graph: {
            fillAlphas: 1,
            balloonText: "<b>[[task]]</b>: [[startFormatted]], [[duration]]"
        },
        rotate: true,
        categoryField: "category",
        segmentsField: "segments",
        colorField: "colour",
        startDateField: "startDate",
        endDateField: "endDate",
        //durationField: "duration",
        dataProvider: [],
        showBalloonAt: "top",
        chartCursor: {
            valueBalloonsEnabled: false,
            cursorAlpha: 0.1,
            valueLineBalloonEnabled: true,
            valueLineEnabled: true,
            fullWidth: true
        },
        'export': {
            enabled: false
        }
    };
}

return stateChart;

}); // define
