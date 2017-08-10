(function() {

    'use strict';

    function editTxnController($scope, $mdDialog, $http, txn) {

        $scope.vm = {
            id: txn.id,
            amount: txn.amount,
            currency: txn.currency,
            txn_date: txn.txn_date
        }

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.send = function(data) {

            if (data.txn_date !== $scope.vm.txn_date) {
                data.txn_date = data.txn_date.toISOString().substring(0, 10);
            }

            $http({
                    method: 'POST',
                    url: 'https://jointhecrew.in/api/txns/priya@gmail.com/' + $scope.vm.id,
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
                    swal('Transaction Updated', 'Data has been saved successfully', 'success');
                }, function(err) {
                	if (err.status == 400 ) {
                       swal('Transaction Not Updated', 'Check the Data');   
                    }
                });

            $mdDialog.hide();
        }
    }

    editTxnController.$inject = ['$scope', '$mdDialog', '$http', 'txn'];
    angular.module('txnApp').controller('EditTxnController', editTxnController);
})();