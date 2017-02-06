hris
	.controller( "overtimeCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{  
            $scope.overtime= {}; 
            overtimeShow(); 
 
            function overtimeShow()
            {
                $http.get( '/getOvertime' )
                   .success( function ( response )
                   {     
                        $scope.overtimes= response;  
                    }); 
            }

            /*==============================================
                    APPROVE/DECLINE OVERIME APPLICATION
            ================================================*/

            $scope.approveOvertime = function( data )
            {   
                data.status="Approved by HR"; 
                $http.post( '/approveOvertime', data )
                    .success( function ( response )
                {      
                    $state.go( $state.current, { empId: data.employee_id }, { reload: true });   
                    leaveAppShow(); 
                }); 
            }

            $scope.declineOvertime = function( data )
            {   
                data.status="Dissaproved by HR"; 
                $http.post( '/declineOvertime', data )
                    .success( function ( response )
                {      
                    $state.go( $state.current, { empId: data.employee_id }, { reload: true });   
                    leaveAppShow(); 
                }); 
            }
             
            /*==============================================
                                ADD OVERTIME 
            ================================================*/ 
 
            $scope.addDialogOvertime= function( )
            { 
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/overtime/overtimeForm.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;  
                        $scope.overtime={};  

                        $scope.empId= function( selected )
                        {  
                            console.log(selected.description.id)
                            $scope.overtime.employee_id= selected.description.id;  
                        }

                        $http.get( '/getAllEmployee') 
                            .success( function ( response ) 
                            {  
                                $scope.employeeNames= response;   
                            })

                        $scope.addOvertime = function ( data )
                        {    
                            $scope.leave.status= "For Manager Approval";
                            $http.post( '/addOvertime', data )
                                .success( function ( response )
                                {   
                                    $state.go( $state.current, { reload: true });
                                    $scope.$broadcast('angucomplete-alt:clearInput'); 
                                    $scope.overtime={};
                                }); 
                        } 
                    }]
                });
            }

            /*==============================================
                            EDIT OVERTIME 
            ================================================*/ 

            $scope.editOvertimes= function(  data )
            {   
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/overtime/overtimeForm.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false,

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;  

                        $scope.overtime={};
                        $scope.overtime.reason= data.reason;
                        $scope.overtime.totalHours= data.totalHours;
                        $scope.overtime.dateRequested= data.dateRequested;
                        $scope.overtime.dateFiled= data.dateFiled; 
                        $scope.overtime.status= "For Manager Approval";
                        $scope.overtime.id= data.id;  

                        $scope.empId= function( selected )
                        {  
                            console.log(selected.description.id)
                            $scope.overtime.employee_id= selected.description.id;  
                        }

                        $http.get( '/getAllEmployee') 
                            .success( function ( response ) 
                            {  
                                $scope.employeeNames= response;   
                            })
                         
                        $scope.updateOvertime = function ( data )
                        {    
                            $http.post( '/updateOvertime', data )
                                .success( function ( response )
                                {   
                                    $state.go( $state.current, { empId: response }, { reload: true });
                                    $scope.$broadcast('angucomplete-alt:clearInput');
                                    $scope.overtime = {};   
                                    overtimeShow();
                                });
                        } 
                    }]
                });
            }
		}
	])