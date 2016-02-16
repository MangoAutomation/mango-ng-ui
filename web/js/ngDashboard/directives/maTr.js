/**
 * Copyright (C) 2015 Deltamation Software. All rights reserved.
 * http://www.deltamation.com.au/
 * @author Jared Wiltshire
 */

define(['globalize'], function(Globalize) {
'use strict';

function maTr() {
    return {
        restrict: 'A',
        scope: {
            maTr: '@',
            maTrArgs: '=?',
        },
        link: function ($scope, $elem, $attrs) {
            var text;
            var args = $scope.maTrArgs || [];
            try {
                text = Globalize.messageFormatter($scope.maTr).apply(Globalize, args);
            } catch(error) {
                text = '!!' + $scope.maTr + '!!';
            }
            
            if ($elem.get(0).nodeType === 3) {
                $elem.get(0).nodeValue = text;
            } else {
                $elem.prepend(document.createTextNode(text));
            }
        }
    };
}

maTr.$inject = [];
return maTr;

}); // define
