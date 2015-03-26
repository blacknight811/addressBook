'use strict';

// Declare app level module which depends on views, and components
var addressApp = angular.module('addressApp', ['ngRoute','ngResource','addressApp.home','addressApp.create', 'ui.router']);

//ROUTES=========================================================
    addressApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'pages/home/partial-home.html',
                controller: 'MainCtrl'
            })

            .state('create',{
                url: '/create',
                templateUrl: 'pages/create/partial-create.html',
                controller: 'CreateCtrl'
            })
            .state('edit', {
                url: '/edit/{contactID:int}',
                templateUrl: 'pages/edit/partial-edit.html',
                controller: 'EditCtrl'
            });

    }]);

//SERVICES=========================================================
    addressApp.factory('Db', ['$resource','$log',function DbFactory ($resource,$log) {

        return $resource('http://localhost:3000/db', {}, {
            query: { method: 'GET', isArray: true },
            create: { method: 'POST' }
        }); //returns whole database object
    }]);

    addressApp.factory('Contacts', ['$resource','$log',function ContactsFactory ($resource,$log) {

       return $resource('http://localhost:3000/contacts', {}, {
           query: { method: 'GET', isArray: true },
           create: { method: 'POST' }
       }); //returns contacts array
    }]);

    addressApp.factory('Contact', ['$resource','$log',function ContactFactory ($resource,$log) {

        return $resource('http://localhost:3000/contacts/:id', {id: '@id'}, {
            show: { method: 'GET'},
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {} }
        }); //returns individual contact by id
    }]);

    addressApp.directive('contactWidget', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '',
            scope: {
                Contact: '='
            }
        };
    });

//CONTROLLERS====================================================
addressApp.controller('MainCtrl', ['$scope','$log','$resource','$location','$window','Contacts', 'Contact','Db', function($scope, $log, $resource, $location, $window,  Contacts, Contact, Db) {
    $scope.contacts = Contacts.query();
    $log.log($scope.contacts);

    Contacts.query().$promise.then(function (data) {
        $scope.contactLength = data.length;
        //$log.log($scope.contactLength);
        return $scope.contactLength;
    });

    $scope.deleteContact = function (contact) {

        Contact.delete(contact, function () {
            $window.location.href = '';
        });
    };

    //$scope.$watch(function () {
    //    return $scope.contact;
    //},
    //    function (contactsUpdate) {
    //        $scope.contact = contactsUpdate;
    //    });
}]);

addressApp.controller('CreateCtrl', ['$scope', '$location', '$log', 'Contacts','Contact', function ($scope, $location, $log, Contacts, Contact) {
    $scope.contact = new Contact();
    $scope.saveContact = function (contact) {
        //$log.info(contact);
        $scope.contact.$save(function () {
            $log.log('Entry Saved!');
        }).then($log.info(contact));
    };
}]);

addressApp.controller('EditCtrl',['$scope','$stateParams','$location','$filter','Contacts', 'Contact','$log',function($scope, $stateParams, $location, $filter, Contacts, Contact,$log) {
    $scope.id = $stateParams.contactID;
    //$log.log($scope.id ,'good');

    Contacts.query().$promise.then(function (data) {
        $scope.singleContact = $filter('filter')(data, function (d) {
            return d.id === $scope.id;
        })[0];
    });

    //$log.log($scope.thisContact);

    var newContact = false;

    var thisContact = Contact.get({ id: $scope.id}, function () {
        $log.log(thisContact);
    });

    $scope.singleContact = new Contact();

    //$log.info($scope.singleContact);

    $scope.saveContact = function () {
        $scope.singleContact.$save(function () {
            $location.path('/');
            $log.info('Contact should be saved :-)');
        });
    };

    //if ($scope.id) {
    //    $scope.Contact = Contacts.query().$promise.then(function (data) {
    //        //$log.log('returned array of objects');
    //    });
    //    //$scope.Contact = $scope.contacts[$scope.id];
    //    //$log.info($scope.Contact);
    //    //$log.info(newContact);
    //} else {
    //    $scope.Contact = {};
    //    newContact = true;
    //    //$log.info('No contact id found!');
    //}
    //$scope.saveContact = function () {
    //    if (newContact) {
    //        //$scope.contacts.push($scope.Contact);
    //        $scope.entry = new Contacts();
    //
    //        Contacts.save($scope.entry);
    //    }
    //    $location.path('/home');
    //};

    //Contacts.save($scope.entry, function () {
    //
    //});
}]);