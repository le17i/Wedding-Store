'use strict';

var API_KEY = 'AAAAJVPh2II:APA91bFHXg4nJ-uoGs29tIt-JSoL7Bu66sAj1S7DXpbSSf83Ze_2I8tBfM3YAG6kWxglhFHLjOp0hl23wJgKihOig3o5Forj2NxnYrgHC-O2tJ7wUjbBysFFWhJC6EsebRuXY_UCSFMI';
var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';

window.addEventListener('load', function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./assets/js/service-worker.js')
            .then(function() {
                    console.log('Service Worker Registered');
            });
    }
});
