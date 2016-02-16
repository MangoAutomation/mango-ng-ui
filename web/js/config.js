/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

(function(){
'use strict';

var bower = '/modules/ngDashboards/web/bower_components/';

require.config({
    paths: {
        'bower': bower,
        'angular': bower + 'angular/angular',
        'angular-bootstrap': bower + 'angular-bootstrap/ui-bootstrap-tpls',
        'angular-resource': bower + 'angular-resource/angular-resource',
        'angular-file-upload': bower + 'angular-file-upload/dist/angular-file-upload.min',
        'ace': bower + 'ace-builds/src-min-noconflict',
        'ngDashboards': '/modules/ngDashboards/web/js',
        'text': '/modules/ngDashboards/web/js/text',
        'bootstrap-material-design': bower + 'bootstrap-material-design/dist/js',
        'moment': bower + 'moment/min/moment-with-locales.min',
        'moment-timezone': bower + 'moment-timezone/builds/moment-timezone-with-data.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-file-upload': {
            deps: ['angular']
        },
        'bootstrap-material-design': {
            deps: ['jquery', 'bootstrap']
        },
        'amcharts/gantt': {
            deps: ['amcharts/serial'],
            exports: 'AmCharts',
            init: function() {
                AmCharts.isReady = true;
            }
        }
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                // allow cross-domain requests
                // remote server allows CORS
                return true;
            }
        }
    }
});

})();