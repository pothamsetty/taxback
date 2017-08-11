(function() {

    'use strict';

    function txnCtrl($scope, $http, $mdDialog, SweetAlert) {

        $scope.searchInput = '';

        $scope.loadTxnData = function() {
            $http.get('https://jointhecrew.in/api/txns/priya@gmail.com').then(function(response) {
                $scope.txnData = response.data;
            }, function(err) {
                console.log('err', err)
            });
        }

        $scope.loadTxnData();

        $scope.createTxn = function(ev) {

            $mdDialog.show({
                controller: 'NewTxnController',
                templateUrl: 'new-txn.html',
                preserveScope: true,
                targetEvent: ev
            }).then(function() {
                $scope.loadTxnData();
            }, function(err) {
                
            });
        }

        $scope.search = function() {
            // if (angular.equals($scope.searchInput, null)) {                 
            //     //$scope.gridApi.grid.refresh();
            //     $scope.loadTxnData();
            // } else 
            if ($scope.searchInput) {
                $http.get('https://jointhecrew.in/api/txns/priya@gmail.com/' + $scope.searchInput).then(function(response) {
                    var arrData = [];
                    arrData.push(response.data);
                    $scope.txnData = arrData;

                }, function(err) {                    
                    if (err.status == 404) {
                        $scope.txnData = [];
                    }
                    $scope.txnData = [];
                });
            } 
        };

        $scope.gridOptions = {
            headerRowHeight: 34,
            rowHeight: 35,
            gridFooterHeight: 2,
            enableColumnMenus: false,
            data: 'txnData',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableSorting: true,
            useExternalSorting: false,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            enableFiltering: false,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            },

            columnDefs: [{
                    field: 'id',
                    displayName: 'ID',
                    width: 200
                },
                {
                    field: 'user',
                    displayName: 'User',                    
                    width: 200
                },
                {
                    field: 'amount',
                    displayName: 'Amount',
                    maxWidth: 200
                },
                {
                    field: 'currency',
                    displayName: 'Currency',
                    maxWidth: 200
                },
                {
                    field: 'txn_date',
                    displayName: 'Txn Date',
                    maxWidth: 300
                },
                {
                    field: 'editIcon',
                    headerCellTemplate: '<div></div>',
                    enableSorting: false,
                    visible: true,
                    cellTemplate: '<div class="editDeleteIcon " ng-click="grid.appScope.editTxn(row.entity)"><span><i class="glyphicon glyphicon-pencil"></i></span></div>',
                    width: 50
                },
                {
                    field: 'deleteIcon',
                    headerCellTemplate: '<div></div>',
                    enableSorting: false,
                    visible: true,
                    cellTemplate: '<div class="editDeleteIcon" ng-click="grid.appScope.deleteTxn(row.entity)"><span><i class="glyphicon glyphicon-remove"></i></span></div>',
                    width: 50
                }
            ]

        };

        $scope.editTxn = function(item) {
            $mdDialog.show({
                controller: 'EditTxnController',
                templateUrl: 'edit-txn.html',
                preserveScope: true,                
                locals: {
                    txn: item
                }
            }).then(function() {
                $scope.loadTxnData();
            }, function(err) {
                console.log(err);
            });
        }

        $scope.deleteTxn = function(item) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this imaginary file!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: true
                },
                function() {
                    $http.delete('https://jointhecrew.in/api/txns/priya@gmail.com/' + item.id).then(function(data) {
                        $scope.loadTxnData();
                    }, function(err) {
                        //console.log(err);
                    });
                });
        }       
    }

    txnCtrl.$inject = ['$scope', '$http', '$mdDialog', 'SweetAlert'];

    angular.module("txnApp", [
            'ui.grid',            
            'ui.grid.pagination',
            'ui.grid.autoResize',
            'ui.bootstrap',
            'ngSanitize',
            'ngAnimate',
            'ngMessages',
            'ngMaterial',
            'mgcrea.ngStrap',
            'oitozero.ngSweetAlert',
        ])
        .controller('txnCtrl', txnCtrl);
})();