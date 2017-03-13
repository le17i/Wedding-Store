(function(angular) {
    'use strict';
    var app = angular.module('wedding-store-search', []);

    app.controller('searchController', searchController);

    searchController.$inject = [
        '$scope',
        '$http',
        '$httpParamSerializer'
    ];

    function searchController($scope, $http, $httpParamSerializer) {
        $scope.storesList = [];
        $scope.search = function() {
            if($scope.term) {
                var params = { search: $scope.term };
                var urlbase = '/api/public/users/?';
                var url = urlbase + $httpParamSerializer(params);

                if ('caches' in window) {
                    console.trace('caches');
                    caches.match(url).then(function(response) {
                        if (response) {
                            response.json().then(function updateFromCache(json) {
                                console.log(json);
                                $scope.$apply(function() {
                                    $scope.storesList = response.data.data;
                                });
                            });
                        }
                    });
                }
                $http
                    .get(url, { params: params })
                    .then(
                        function(response) {
                            $scope.storesList = response.data.data;
                        }
                    );
            }
        };
    }

    angular.element(function() {
        angular.bootstrap(document, ['wedding-store-search']);
    });
})(angular);