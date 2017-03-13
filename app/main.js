(function(angular) {
    'use strict';
    var API_KEY = 'AAAAJVPh2II:APA91bFHXg4nJ-uoGs29tIt-JSoL7Bu66sAj1S7DXpbSSf83Ze_2I8tBfM3YAG6kWxglhFHLjOp0hl23wJgKihOig3o5Forj2NxnYrgHC-O2tJ7wUjbBysFFWhJC6EsebRuXY_UCSFMI';
    var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';
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

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(function() {
                        console.log('Service Worker Registered');
                });
        }
    });
})(angular);