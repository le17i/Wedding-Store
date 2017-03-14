(function(angular) {
    'use strict';
    var app = angular.module('wedding-store', []);

    app.controller('mainController', mainController);

    mainController.$inject = [
        '$scope',
        '$http'
    ];

    function mainController($scope, $http) {

        $scope.storeList = [];

        $scope.getList = function() {
            $http
                .get('/api/public/products/' + window.userId)
                .then(
                    function(response) {
                        $scope.storeList = response.data.data;
                    }
                );
        };

        $scope.select = function(id, index) {
            var url = '/api/public/products/' + window.userId + '/' + id;
            $http
                .put(url)
                .then(
                    function(response) {
                        $scope.storeList[index] = response.data.data;
                    }
                );
        };

        $scope.getList();
    }

    angular.element(function() {
        angular.bootstrap(document, ['wedding-store']);
    });
})(angular);