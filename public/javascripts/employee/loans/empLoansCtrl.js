hris
	.controller( "empLoansCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$rootScope",
        "ngDialog",
        "$stateParams",

		function controller( $scope, $http, $state, $timeout, $rootScope, ngDialog, $stateParams )
		{ 
            $scope.loan= {}; 
            loanShow();
  
            /*==============================================
                                ADD LOAN
            ================================================*/
 
            $scope.addLoanDialog = function ( )
            {     
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/loans/loanAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {   
                        $scope.add= true;
                        $scope.loan={};
   
                        $http.get( '/getLending') 
                            .success( function ( response ) 
                            {   
                                $scope.lendings= response;   
                            })

                        $http.get( '/getLoanType') 
                            .success( function ( response ) 
                            {   
                                $scope.loans= response;   
                            })   

                        $scope.addLoan = function( data )
                        {
                            data.employee_id= $stateParams.empId;
                            $http.post( '/addLoan', data )
                                .success( function ( response )
                                { 
                                    $state.go( $state.current, {}, { reload: true }); 
                                    $scope.loan= {};
                                    $scope.$broadcast('angucomplete-alt:clearInput'); 
                                })
                        } 

                    }]
                });
            }

            /*==============================================
                            RETRIEVE LOAN
            ================================================*/
            
            function loanShow()
            {
                var id= $stateParams.empId;  
                $http.get( '/getLoanId/' + id )
                    .success( function ( response )
                    {     
                        $scope.loanList= response;  
                    });  
            } 

            var userId= $stateParams.userId;  
            $http.get( '/getLoanId/' + userId )
                .success( function ( response )
                {     
                    $scope.profLoanList= response;  
                }) ;

             /*==============================================
                            EDIT LOAN
            ================================================*/
  
            $scope.edit = function ( data )
            {     
                console.log(data)
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/loans/loanAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {   
                        $scope.add= false;
                        $scope.loan={};
                        $scope.loan.id= data.id;
                        $scope.employee_id= data.employee_id;
                        $scope.loan.loanType_id= data.loanType_id;
                        $scope.loan.lendingCompany_id= data.lendingCompany_id; 
                        $scope.loan.amount= data.amount;
                        $scope.loan.term= data.term;
                        $scope.loan.monthlyAmortization= data.amortization;
                        $scope.loan.startDate= data.startDate;
                        $scope.loan.endDate= data.endDate;
                        $scope.loan.remarks= data.remarks;  

                        $http.get( '/getLending') 
                            .success( function ( response ) 
                            {   
                                $scope.lendings= response;   
                            })

                        $http.get( '/getLoanType') 
                            .success( function ( response ) 
                            {   
                                $scope.loans= response;   
                            })   

                        $scope.updateLoan= function( data )
                        {
                            $http.post( '/updateLoan', data )
                                .success( function( response )
                                {
                                    $state.go( $state.current, {}, { reload: true });  
                                    $scope.loan= {};
                                    $scope.$broadcast('angucomplete-alt:clearInput'); 
                                })
                        } 

                    }]
                });
            } 

            $scope.deleteLoan= function( data )
            {
                $http.delete( '/deleteLoan/' + data )
                    .success( function( response )
                    {
                        loanShow();
                    })
            } 

		}
	])