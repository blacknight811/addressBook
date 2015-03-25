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
                url: '/edit/:contactID',
                templateUrl: 'pages/edit/partial-edit.html',
                controller: 'EditCtrl'
            })
            .state('delete', {
                url: '/delete/:contactID',
                templateUrl: 'pages/add/partial-add.html'
            });
    }]);

//SERVICES=========================================================
    addressApp.factory('Contacts', ['$resource','$log',function ContactsFactory ($resource,$log) {

       return $resource('http://localhost:3000/contacts', {}, {
           query: { method: 'GET', isArray: true },
           create: { method: 'POST' }
       });
    }]);

    addressApp.factory('Contact', ['$resource','$log',function ContactFactory ($resource,$log) {

        return $resource('http://localhost:3000/contacts/:id', {id: '@id'}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {} }
        });
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
addressApp.controller('MainCtrl', ['$scope','$log','$resource','$location','$window','Contacts', 'Contact', function($scope, $log, $resource, $location, $window, Contacts, Contact) {
    $scope.contacts = Contacts.query();

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

    $scope.$watch(function () {
        return $scope.contacts;
    },
        function (contactsUpdate) {
            $scope.contacts = contactsUpdate;
        });
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

addressApp.controller('EditCtrl',['$scope','$stateParams','$location','Contacts','$log',function($scope, $stateParams, $location, Contacts,$log) {
    $log.log($stateParams.contactID);
    $scope.id = $stateParams.contactID;

    var newContact = false;

    if ($stateParams.contactId) {
        $scope.Contact = $scope.contacts[$stateParams.contactId];
    } else {
        $scope.Contact = {};
        newContact = true;
    }
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