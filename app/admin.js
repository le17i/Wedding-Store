(function(angular) {
    'use strict';
    var app = angular.module('wedding-store-admin', []);

    app.controller('adminController', adminController);

    adminController.$inject = [
        '$scope',
        '$http'
    ];

    function adminController($scope, $http) {
        $scope.storeList = [];

        $scope.getList = function() {
            $http
                .get('/api/restrict/products')
                .then(
                    function(response) {
                        $scope.storeList = response.data.data;
                    }
                );
        };

        $scope.newItem = {
            name: null,
            value: null
        };

        $scope.insert = function() {
            if($scope.newItem.name && $scope.newItem.value) {
                $http
                    .post('/api/restrict/products', $scope.newItem)
                    .then(
                        function(response) {
                            $scope.storeList.push(response.data.data);
                            $scope.newItem.name = null;
                            $scope.newItem.value = null;
                        }
                    );
            }
        };

        $scope.remove = function(id, index) {
            $http
                .delete('/api/restrict/products/' + id)
                .then(
                    function(response) {
                        $scope.storeList.splice(index, 1);
                    }
                );
        };

        $scope.getList();
    }

    angular.element(function() {
        angular.bootstrap(document, ['wedding-store-admin']);
    });
})(angular);