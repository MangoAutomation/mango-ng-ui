/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['mango/PointEventManager'], function(PointEventManager) {
'use strict';

function PointEventManagerFactory() {
    return new PointEventManager();
}

PointEventManagerFactory.$inject = [];
return PointEventManagerFactory;

}); // define
