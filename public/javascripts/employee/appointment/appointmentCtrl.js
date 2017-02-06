hris
	.controller( "appointmentCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.serv = {}; 
            serviceShow();
    
            /*==============================================
						DISPLAY  INFO IN TABLE
            ================================================*/
  
            function serviceShow()
            {
                var id = $stateParams.empId;  
                $http.get( '/getService/' + id )
                    .success( function ( response )
                    {     
                        if ( response.length > 0 )
                        {
                            $scope.servicings = response;   
                        }  
                    }); 

                var userId = $stateParams.userId;  
                $http.get( '/getService/' + userId )
                    .success( function ( response )
                    {     
                        if ( response.length > 0 )
                        {
                            $scope.profServicings = response;  
                        }  
                    }); 
            }

            /*==============================================
                        SERVICE REDIRECTION
            ================================================*/

            $scope.editService = function ( data )
            {       

                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/appointment/appointmentAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width customized',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $http.get( '/getPosition' )
                            .success( function ( response ) 
                            {
                                $scope.positions = response;
                            });
         
                        $http.get( '/getCompany' )
                            .success( function ( response ) 
                            {
                                $scope.companies = response;
                            }); 

                        $http.get( '/getBranch' )
                            .success( function( response )
                            {
                                $scope.branches= response;
                            });

                        $scope.add= false; 
                        $scope.serv= {};
                        $scope.serv.id= data.id;
                        $scope.serv.position_id= data.position_id;
                        $scope.serv.employmentStatus= data.employmentStatus;
                        $scope.serv.dateAssigned= data.dateAssigned;
                        $scope.serv.dateRegularization= data.dateRegularization; 
                        $scope.serv.company_id= data.company_id;
                        $scope.serv.branch_id= data.branch_id;
                        $scope.serv.basicSalary= data.basicSalary;
                        $scope.serv.sss= data.sss;
                        $scope.serv.phic= data.phic;
                        $scope.serv.hdmf= data.hdmf;
                        $scope.serv.tax= data.tax;
                        $scope.serv.remarks= data.remarks;

                        $scope.updateService = function ( data )
                        {   
                            $scope.submitForm= function( isValid )
                            {
                               if( isValid ) 
                               {
                                    $http.post( '/updateService', data )
                                        .success( function ( response )
                                    { 
                                        $state.go( $state.current, {}, { reload: true }); 
                                        serviceShow();
                                    });
                               } else {
                                    alert('ERROR: Please fill in the required field(s) given.');
                               }
                            }   
                        } 
                    }]
                });   
            }
              
            $scope.addServiceDialog = function ( )
            {     

                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/appointment/appointmentAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width customized',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $http.get( '/getPosition' )
                            .success( function ( response ) 
                            {
                                $scope.positions = response;
                            });
         
                        $http.get( '/getCompany' )
                            .success( function ( response ) 
                            {
                                $scope.companies = response;
                            }); 

                        $http.get( '/getBranch' )
                            .success( function( response )
                            {
                                $scope.branches= response;
                            });

                        $scope.add= true; 

                        $scope.addService = function ( data ) 
                        {  
                            $scope.submitForm= function( isValid )
                            {
                                if( isValid )
                                {
                                    data.employee_id = $stateParams.empId;
                                    $http.post( '/addService', data )
                                        .success( function ( response ) 
                                    {   
                                        serviceShow();
                                        $state.go( $state.current, { }, { reload: true }); 
                                    }); 
                                } else {
                                    alert('ERROR: Please fill in the required field(s) given.');
                                }    
                            } 
                        }  
                    }]
                });       
            }

            $scope.deleteAppointment = function ( data )
            { 
                $http.delete( '/deleteAppointment/' + data )
                    .success( function ( response )
                {    
                    serviceShow();
                });
            } 
		}
	])