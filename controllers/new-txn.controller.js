(function() {

    'use strict';

    function newTxnController($scope, $mdDialog, $http, SweetAlert) {
        
        $scope.currency = ['INR', 'USD', 'GBP', 'EUR'];

        $scope.vm = {
            amount: '',
            currency: '',
            txn_date: ''
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.send = function(data) {
            data.txn_date = data.txn_date.toISOString().substring(0, 10);

            $http({
                    method: 'POST',
                    url: 'https://jointhecrew.in/api/txns/priya@gmail.com',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                })
                .then(function() {
                    //success
                    swal('Transaction', 'Data has been saved successfully', 'success');
                }, function(err) {
                    //error
                });
            $mdDialog.hide();
        }

    }

    newTxnController.$inject = ['$scope', '$mdDialog', '$http', 'SweetAlert'];
    angular.module('txnApp').controller('NewTxnController', newTxnController);
})();