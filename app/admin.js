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
            var url = '/api/restrict/products';
            if ('caches' in window) {
                caches.match(url).then(function(response) {
                    if (response) {
                        response.json().then(function updateFromCache(json) {
                            $scope.$apply(function() {
                                $scope.storesList = response.data.data;
                            });
                        });
                    }
                });
            }
            $http
                .get(url)
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

        var subscriptionButton = document.getElementById('subscriptionButton');

        function getSubscription() {
            return navigator.serviceWorker.ready
                .then(registration => registration.pushManager.getSubscription());
        }

        function sendSubscribe(subscription) {
            var rawKey = null;
            var key = null;
            var rawAuthSecret = null;
            var authSecret = null;

            // Retrieve the user's public key.
            if(subscription.getKey) {
                rawKey = subscription.getKey('p256dh');
                rawAuthSecret = subscription.getKey('auth');
                if(rawKey) {
                    key = btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey)));
                }

                if(rawAuthSecret) {
                    authSecret = btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret)))
                }
            }

            var body = {
                endpoint: subscription.endpoint,
                key: key,
                authSecret: authSecret
            };

            return new Promise((resolve, reject) => {
                $http
                    .post('/api/restrict/subscription', body)
                    .then(() => resolve());
            });
        }

        function sendUnSubscribe(subscription) {
            return new Promise((resolve, reject) => {
                $http
                    .delete('/api/restrict/subscription', { endpoint: subscription.endpoint })
                    .then(() => resolve());
            });
        }

        function subscribe() {
            navigator.serviceWorker.ready
                .then(registration => registration.pushManager.subscribe({ userVisibleOnly: true }))
                .then(sendSubscribe)
                .then(setUnsubscribeButton)
                .catch(e => console.error(e));
        }

        function unsubscribe() {
            getSubscription()
                .then(subscription => subscription.unsubscribe().then(sendUnSubscribe))
                .then(setSubscribeButton);
        }

        function setSubscribeButton() {
            subscriptionButton.onclick = subscribe;
            subscriptionButton.textContent = 'Subscribe web push';
        }
        
        function setUnsubscribeButton() {
            subscriptionButton.onclick = unsubscribe;
            subscriptionButton.textContent = 'Unsubscribe web push';
        }

        function activeSubscribeButton() {
            subscriptionButton.removeAttribute('disabled');

            getSubscription()
                .then(subscription => (subscription) ? setUnsubscribeButton() : setSubscribeButton());
        }

        // Active service worker
        (function() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('./service-worker.js')
                    .then(activeSubscribeButton)
                    .catch(e => console.error(e));
            }
        })();

        $scope.getList();
    }

    angular.element(function() {
        angular.bootstrap(document, ['wedding-store-admin']);
    });
})(angular);