hris
	.controller( "bankCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
		"ngDialog",
		"$stateParams",

		function controller( $scope, $http, $state, $timeout, ngDialog, $stateParams )
		{

            bankingIdShow();

            /*==============================================
                            RETRIEVE BENEFIT
            ================================================*/

            function bankingIdShow()
            {
                var id= $stateParams.empId;
                $http.get( '/getBankingShowId/' + id )
                    .success( function( response ) 
                    {
                        $scope.bankings= response;
                    }); 
            }
            

            var userId= $stateParams.userId;
            $http.get( '/getBankingShowId/' + userId )
                .success( function( response ) 
                {
                    $scope.profBankings= response;
                });

            /*==============================================
							ADD BANK
	        ================================================*/
 
	        $scope.addDialogBank = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/banking/bankAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.bank= {};  

                        $scope.addBank = function ( data )
				        { 
				        	data.employee_id= $stateParams.empId;
				          	$http.post( '/addBank', data )
				          		.success( function ( response )
				          		{  
				          			$state.go( $state.current, {}, { reload: true });
				          			$scope.bank = {};
				                    $scope.$broadcast('angucomplete-alt:clearInput'); 
                                    bankingIdShow();
				          		});
				        }   
                    }]
                });
            } 

            /*==============================================
							EDIT BANK
	        ================================================*/
 
	        $scope.edit = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/banking/bankAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                        $scope.bank= {};  
                        $scope.bank.id= data.id;
                        $scope.employee_id= data.employee_id;
                        $scope.bank.bank= data.bank;
                        $scope.bank.accountNo= data.accountNo;

                        $scope.empId= function( selected )
				        {   
				            $scope.bank.employee_id= selected.description.id;  
				        }

				        $http.get( '/getAllEmployee') 
				            .success( function ( response ) 
				            {  
				                $scope.employeeNames= response;   
				            })

                        $scope.updateBank = function ( data )
				        { 
				          	$http.post( '/updateBank', data )
				          		.success( function ( response )
				          		{  
				          			$state.go( $state.current, {}, { reload: true });
				          			$scope.bank = {};
				                    $scope.$broadcast('angucomplete-alt:clearInput'); 
                                    bankingIdShow();
				          		});
				        }   
                    }]
                });
            } 

            $scope.deleteBanking = function ( data )
            { 
                $http.delete( '/deleteBanking/' + data )
                    .success( function ( response )
                    {  
                        bankingIdShow(); 
                    });
            }   
		}
	])