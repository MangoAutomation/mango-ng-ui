/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

(function(root){
'use strict';

root.require = {
    baseUrl : '/resources',
    paths: {
        'mango': '../mango-javascript/mango-2.0',
        'mango-1.0': '../modules/dashboards/web/js/mango/v1',
        'mango-1.1': '../modules/dashboards/web/js/mango-1.1',
        'mango-2.0': '../mango-javascript/mango-2.0',
        'jquery': 'jquery/jquery-1.11.2.min',
        'jquery-ui/jquery-ui': 'jquery-ui/jquery-ui.min',
        'bootstrap': 'bootstrap/js/bootstrap.min',
        'es5-shim': 'es5-shim.min',
        'jstz': 'jstz-1.0.4.min',
        'jquery.mousewheel': 'jquery.mousewheel.min',
        'jquery.select2': 'select2/js/select2.full.min',
        'jquery.notify': 'notify-combined.min',
        'dojo': 'amd/dojo',
        'dijit': 'amd/dijit',
        'dojox': 'amd/dojox',
        'angular': '../modules/ngDashboards/web/bower_components/angular/angular',
        'angular-bootstrap': '../modules/ngDashboards/web/bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-resource': '../modules/ngDashboards/web/bower_components/angular-resource/angular-resource',
        'ngDashboards': '../modules/ngDashboards/web/js',
        'moment': '../modules/ngDashboards/web/bower_components/moment/min/moment-with-locales.min',
        'moment-timezone': '../modules/ngDashboards/web/bower_components/moment-timezone/builds/moment-timezone-with-data.min',
        'text': '../modules/ngDashboards/web/js/text',
        'bootstrap-material-design': '../modules/ngDashboards/web/bower_components/bootstrap-material-design/dist/js'
    },
    shim: {
        "bootstrap" : {
            "deps" : ['jquery']
        },
        'amcharts/funnel'   : {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/gauge'    : {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/pie'      : {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/radar'    : {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/serial'   : {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/xy'       : {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/gantt': {
            deps: ['amcharts/serial'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        },
        'amcharts/exporting/amexport': {
            deps: ['amcharts/amcharts'],
            exports: 'AmCharts'
        },
        'amcharts/exporting/filesaver': {
            deps: ['amcharts/amcharts']
        },
        'amcharts/exporting/jspdf.plugin.addimage': {
            deps: ['amcharts/exporting/jspdf']
        },
        'jquery.mousewheel': {"deps" : ['jquery']},
        'jquery.select2': {"deps" : ['jquery']},
        'jquery.notify': {"deps" : ['jquery']},
        'jquery-ui/jquery-ui': {"deps" : ['jquery']},
        'angular': {
            exports: 'angular'
        },
        'angular-bootstrap': {
            deps : ['angular']
        },
        'angular-resource': {
            deps : ['angular']
        }
    },
    map: {
        '*': {
            'dgrid': 'dgrid-0.4'
        }
    }
};

})(this); // execute anonymous function
