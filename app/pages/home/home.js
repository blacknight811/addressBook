'use strict';

var addressSub = angular.module('addressApp.home', ['ngRoute']);

addressSub.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/partial-create.html',
            controller: 'View1Ctrl'
  });
}]);

addressSub.controller('View1Ctrl', [function() {

}]);