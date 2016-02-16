/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['angular', 'globalize'], function(angular, Globalize) {
'use strict';

function maTrFactory() {
    var maTr = function(key, args) {
        if (!angular.isArray(args)) {
            args = Array.prototype.slice.call(arguments, 1);
        }
        return Globalize.messageFormatter(key).apply(Globalize, args);
    };
    
    return maTr;
}

return maTrFactory;

}); // define
