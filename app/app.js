'use strict';

// Declare app level module which depends on views, and components
var addressApp = angular.module('addressApp', ['ngRoute','ngResource','addressApp.home','addressApp.create', 'ui.router']);

//ROUTES=========================================================
    addressApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'pages/home/partial-home.html',
                controller: MainCtrl
            })

            .state('create',{
                url: '/create',
                templateUrl: 'pages/create/partial-create.html'
            })
            .state('edit', {
                url: '/edit/:contactID',
                templateUrl: 'pages/edit/partial-edit.html',
                controller: EditCtrl
            })
            .state('delete', {
                url: '/add',
                templateUrl: 'pages/add/partial-add.html'
            });
    }]);

//SERVICES=========================================================
    addressApp.factory('contactsFactory', [function () {
        var contactList = {};

        contactList.entries = [
            {
                "id": 1,
                "firstName": "Bryan",
                "lastName": "Knight",
                "email": "bjknight1980@gmail.com",
                "street": "3545 Cactus Shadow St.",
                "city": "Las Vegas",
                "state": "NV",
                "postal": "89129",
                "phone": "702-439-3241"
            },
            {
                "id": 2,
                "firstName": "Carlos",
                "lastName": "Summers",
                "email": "losmusic@gmail.com",
                "street": "1325 Hash St",
                "city": "Las Vegas",
                "state": "NV",
                "postal": "89132",
                "phone": "702-808-7777"
            }
        ];

        return contactList;

    }]);

    addressApp.directive('contactWidget', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '',
            scope: {
                contact: '='
            }
        };
    });

