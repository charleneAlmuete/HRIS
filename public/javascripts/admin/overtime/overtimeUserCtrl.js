hris
	.controller( "overtimeUserCtrl", [ 
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

                var id= $stateParams.userId; 
                $http.get( '/getOvertimeUser/' + id )
                   .success( function ( response )
                   {     
                        $scope.overtimeUsers= response;  
                    }); 

                $http.get( '/getRoleCompany/' + id)
                    .success( function ( response ) 
                    {    
                        if( response.length > 0 )
                        { 
                            $scope.com = response[0]; 
                            $http.get( '/getOvertimeManager/' + $scope.com.company_id)
                               .success( function ( response )
                                {       
                                    $scope.overtimeManagers= response;  
                                });    
                        } 
                    }); 
            }

            /*==============================================
                    APPROVE/DECLINE LEAVE APPLICATION
            ================================================*/

            $scope.approveOvertime = function( data )
            {   
                data.status="Approved by Manager"; 
                $http.post( '/approveOvertime', data )
                    .success( function ( response )
                {      
                    $state.go( $state.current, { empId: data.employee_id }, { reload: true });   
                    leaveAppShow(); 
                }); 
            }

            $scope.declineOvertime = function( data )
            {   
                data.status="Dissaproved by Manager"; 
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
                    templateUrl: "./public/javascripts/admin/overtime/overtimeAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;  
                        $scope.overtime={};  

                        $scope.addOvertime = function ( data )
                        {   
                            $scope.overtime.employee_id = $stateParams.userId;
                            $scope.overtime.status= "For Manager Approval";
                            $http.post( '/addOvertime', data )
                                .success( function ( response )
                                {   
                                    $state.go( $state.current, { reload: true });
                                    overtimeShow();
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
                    templateUrl: "./public/javascripts/admin/overtime/overtimeAdd.html",
                    showClose: false,
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
                         
                        $scope.updateOvertime = function ( data )
                        {    
                            $http.post( '/updateOvertime', data )
                                .success( function ( response )
                                {   
                                    $state.go( $state.current, { empId: response }, { reload: true });
                                    $scope.overtime = {};   
                                    overtimeShow();
                                });
                        }

                        $scope.closeAll= function()
                        { 
                            ngDialog.closeAll();   
                        } 
                    }]
                });
            }
		}
	])