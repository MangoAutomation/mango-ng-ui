/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['angular', './ngDashboardApp'], function(angular, ngDashboardApp) {
'use strict';

var appElement = document.getElementById('ngDashboardApp') || document.body;
angular.bootstrap(appElement, ['ngDashboardApp']);

}); // require
