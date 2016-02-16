/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['amcharts/pie', 'jquery'], function(AmCharts, $) {
'use strict';

function pieChart($http) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          values: '=',
          valueLabels: '=?',
          options: '=?'
        },
        template: '<div class="amchart"></div>',
        link: function ($scope, $element, attributes) {
            var options = $.extend(defaultOptions(), $scope.options);
            var chart = AmCharts.makeChart($element[0], options);
            
            var labelFn = createLabelFn();
            $scope.$watchCollection('valueLabels', function(value) {
                labelFn = createLabelFn(value);
            });

            $scope.$watchCollection('values', function(newValue, oldValue) {
                var values = $.extend(true, [], newValue);
                
                for (var i = 0; i < values.length; i++) {
                    var value = values[i];
                    var label = labelFn(value.value);
                    
                    value.text = label.text;
                    if (label.colour) {
                        value.colour = label.colour;
                    }
                    value.runtime = values[i].runtime / 1000;
                }
                
                chart.dataProvider = values;
                chart.validateData();
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
        }
    };
}

function defaultOptions() {
    return {
        type: "pie",
        theme: "light",
        dataProvider: [],
        valueField: "runtime",
        titleField: "text",
        colorField: "colour",
        balloon:{
            fixedPosition:true
        },
        'export': {
          enabled: true
        }
    };
}

pieChart.inject = ['$http'];
return pieChart;

}); // define
