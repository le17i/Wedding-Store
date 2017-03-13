(function(angular) {
    'use strict';
    var app = angular.module('wedding-store-search', []);

    app.controller('searchController', searchController);

    searchController.$inject = [
        '$scope',
        '$http'
    ];

    function searchController($scope, $http) {
        $scope.storesList = [];
        $scope.search = function() {
            if($scope.term) {
                var params = { search: $scope.term };
                $http
                    .get('/api/public/users', { params: params })
                    .then(
                        function(response) {
                            $scope.storesList = response.data.data
                        }
                    );
            }
        };
    }

    angular.element(function() {
        angular.bootstrap(document, ['wedding-store-search']);
    });
})(angular);