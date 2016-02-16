/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['amcharts/gauge', 'jquery', 'moment-timezone'], function(AmCharts, $, moment) {
'use strict';

function clock() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
          options: '=?',
          text: '@',
          timezone: '@',
          showSeconds: '@'
        },
        template: '<div class="amchart"></div>',
        link: function ($scope, $element, attributes) {
            var options = $.extend(defaultOptions(), $scope.options);
            var showSeconds = $scope.showSeconds !== 'false';
            if (!showSeconds) {
                options.arrows.pop();
            }
            
            var chart = AmCharts.makeChart($element[0], options);
            var timer = setInterval(updateClock, 1000);
            
            function updateClock() {
                if ($scope.text) {
                    chart.axes[0].setBottomText($scope.text);
                }
                
                var date;
                if ($scope.timezone) {
                    date = moment.tz(new Date(), $scope.timezone);
                } else {
                    date = moment();
                }
                
                var hours = date.hours();
                var minutes = date.minutes();
                var seconds = date.seconds();
                
                chart.arrows[0].setValue(hours + minutes / 60);
                chart.arrows[1].setValue( 12 * (minutes + seconds / 60 ) / 60);
                if (chart.arrows.length > 2) {
                    chart.arrows[2].setValue(12 * seconds / 60);
                }
            }
            
            $scope.$on('$destroy', function() {
                clearInterval(timer);
            });
        }
    };
}

function defaultOptions() {
    return {
        type: "gauge",
        theme: "light",
        addClassNames: true,
        startDuration: 0.3,
        axes: [{
            axisAlpha: 0.3,
            endAngle: 360,
            startAngle: 0,
            endValue: 12,
            minorTickInterval: 0.2,
            showFirstLabel: false,
            axisThickness: 1,
            valueInterval: 1
        }],
        arrows: [{
            radius: "50%",
            innerRadius: 0,
            clockWiseOnly: true,
            nailRadius: 10,
            nailAlpha: 1
        }, {
            nailRadius: 0,
            radius: "80%",
            startWidth: 6,
            innerRadius: 0,
            clockWiseOnly: true
        }, {
            color: "#CC0000",
            nailRadius: 4,
            startWidth: 3,
            innerRadius: 0,
            clockWiseOnly: true,
            nailAlpha: 1
        }]
    };
}

clock.$inject = [];
return clock;

}); // define
