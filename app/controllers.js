'use strict';
function MainCtrl ($scope, $log, contactsFactory) {
    //$scope.contacts = contactsFactory.query();

    $log.log(contactsFactory);

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