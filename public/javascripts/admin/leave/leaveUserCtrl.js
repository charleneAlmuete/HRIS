hris
	.controller( "leaveUserCtrl", [
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams", 
        "ngDialog",
        "$filter",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog, $filter )
		{   
            leaveAppShow(); 
            leavePending();  
            $scope.leave={}; 
            
            /*==============================================
                    DISPLAY EMPLOYEE INFO IN RIGHT NAVBAR
            ================================================*/

            var id= $stateParams.userId;  
            $http.get( '/getRoleId/' + id)
                .success( function ( response ) 
                {    
                    $scope.rolesId = response;   
                });

            function leaveAppShow()
            {   
                $http.get( '/getLeaveApp' )
                   .success( function ( response )
                    {      
                        $scope.leaveApps= response;  
                    });

                var id= $stateParams.userId; 
                $http.get( '/getUserLeaveApp/' + id )
                   .success( function ( response )
                    {     
                        $scope.leaveUserApps= response; 
                    });

                $http.get( '/getRoleCompany/' + id)
                    .success( function ( response ) 
                    {    
                        if( response.length > 0 )
                        { 
                            $scope.com = response[0]; 
                            $http.get( '/getManagerLeaveApp/' + $scope.com.company_id)
                               .success( function ( response )
                                {      
                                    $scope.leaveManagerApps= response;  
                                });    
                        }
                         
                       
                    }); 
            }; 

            function leavePending()
            {
              $http.get( '/getLeavePending' )
                   .success( function ( response )
                   {  
                        if ( response.length > 0 )
                        { 
                            $scope.leavePendings= response;
                            $scope.LeavePendingHistory= true;
                            $scope.approveButton= true;
                            $scope.declineButton= true;
                        } else {
                            $scope.LeavePendingHistory= false;
                            $scope.approveButton= true;
                            $scope.declineButton= true;
                        }
                });   
            } 

            /*==============================================
                        APPROVE/DECLINE LEAVE APPLICATION
            ================================================*/

            $scope.approveLeave = function( data )
            {   
                data.status="Approved by Manager"; 
                $http.post( '/approveLeaveApp', data )
                    .success( function ( response )
                {      
                    $state.go( $state.current, { empId: data.employee_id }, { reload: true });   
                    leaveAppShow(); 
                }); 
            }

            $scope.declineLeave = function( data )
            {   
                data.status="Dissaproved by Manager"; 
                $http.post( '/declineLeaveApp', data )
                    .success( function ( response )
                {      
                    $state.go( $state.current, { empId: data.employee_id }, { reload: true });   
                    leaveAppShow(); 
                }); 
            }

            /*==============================================
                            ADD LEAVE APPLICATION
            ================================================*/
 
            $scope.addLeaves = function ( )
            {     
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/admin/leave/leaveForm.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.leave={}; 
                        
                        $http.get( '/getLeave') 
                            .success( function ( response ) 
                            {     
                                $scope.leaveTypes= response;   
                            })
 
                        $scope.addLeaveApp = function ( data )
                        {    
                            data.dateFiled = $filter('date')(new Date(), 'yyyy/MM/dd');  
                            $scope.leave.employee_id = $stateParams.userId;   
                            $scope.leave.status= "For Manager Approval";
                            $http.post( '/addLeaveApp', data )
                                .success( function ( response )
                            {     
                                $state.go( $state.current, { empId: data.employee_id }, { reload: true });
                                $scope.leave = {}; 
                                $scope.$broadcast('angucomplete-alt:clearInput');  
                            });        
                        } 
                    }]
                });
            }

            /*==============================================
                        UPDATE LEAVE APPLICATION
            ================================================*/
 
            $scope.editLeave = function ( data )
            {       
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/admin/leave/leaveForm.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                         
                        $http.get( '/getLeave') 
                            .success( function ( response ) 
                            {     
                                $scope.leaveTypes= response;   
                            })

                        $scope.leave={}; 
                        $scope.leave.id= data.id;
                        $scope.leave.status= "For Manager Approval";
                        $scope.employeeName= data.employee;
                        $scope.leave.employee_id= data.employee_id;
                        $scope.leave.leave_id= data.leave_id;
                        $scope.leave.mode= data.mode;
                        $scope.leave.dateFiled= data.dateFiled;
                        $scope.leave.durFrom= data.durFrom;
                        $scope.leave.durTo= data.durTo;
                        $scope.leave.days_applied= data.days_applied;
                        $scope.leave.reason= data.reason;
                         
                        $scope.updateLeaveApp = function ( data )
                        {    
                            $http.post( '/updateLeaveApp', data )
                                .success( function ( response )
                            {     
                                $state.go( $state.current, { empId: data.employee_id }, { reload: true });
                                $scope.leave = {};
                                $scope.$broadcast('angucomplete-alt:clearInput');
                                leaveAppShow(); 
                            }); 
                        } 
                    }]
                });
            }

            /*==============================================
                        DELETE LEAVE APPLICATION
            ================================================*/

            $scope.delete = function( data )
            { 
                $http.delete( '/deleteLeaveApp/' + data )
                    .success( function ( response )
                {  
                    $scope.leave = {}; 
                    leaveAppShow();
                });
            }

             /*==============================================
                        APPROVE LEAVE APPLICATION
            ================================================*/

            $scope.approve = function( data )
            {  
                console.log(data)
                $http.post( '/approveLeaveApp/' + data )
                    .success( function ( response )
                {   
                    $scope.approvedButton= true; 
                    $scope.approveButton= false; 
                    $scope.declinedButton= false;
                    $scope.declineButton= false;
                    leaveAppShow();
                });
            }

            /*==============================================
                        DECLINE LEAVE APPLICATION
            ================================================*/

            $scope.decline = function( data )
            {  
                $http.post( '/declineLeaveApp/' + data )
                    .success( function ( response )
                {    
                    $scope.approvedButton= false;
                    $scope.approveButton= false;
                    $scope.declineButton= false;
                    $scope.declinedButton= true;
                    leaveAppShow();
                });
            }
		}
	])