'use strict';
function MainCtrl ($scope, $log, contactsFactory) {
    $scope.contacts = contactsFactory.entries;

    $log.log($scope.contacts);
    $log.log($scope.contacts.length);

}

function EditCtrl ($scope, $stateParams, $location) {
    var newContact = false;
    if ($stateParams.contactId) {
        $scope.contact = $scope.contacts[$stateParams.contactId];
    } else {
        $scope.contact = {};
        newContact = true;
    }
    $scope.saveContact = function () {
        if (newContact) {
            $scope.contacts.push($scope.contact);
        }
        $location.path('/home');
    };
}