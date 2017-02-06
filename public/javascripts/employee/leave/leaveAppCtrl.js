hris
	.controller( "leaveAppCtrl", [
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams", 
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{   
            leaveAppShow(); 
            leavePending();  
            $scope.leave={};  

            function leaveAppShow()
            {   
                $http.get( '/getLeaveApp' )
                   .success( function ( response )
                   {   
                        if( response.length > 0 )
                        {
                            $scope.leaveApps= response;
                            $scope.leaveAppHistory= true;  
                        } else {
                            $scope.leaveAppHistory= false;
                        } 
                });   
            }

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
                data.status="Approved by HR"; 
                $http.post( '/approveLeaveApp', data )
                    .success( function ( response )
                {      
                    $state.go( $state.current, { empId: data.employee_id }, { reload: true });   
                    leaveAppShow(); 
                }); 
            }

            $scope.declineLeave = function( data )
            {   
                data.status="Dissaproved by HR"; 
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
 
            $scope.addLeave = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/leave/leaveAdd.html",
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

                        $scope.empId= function( selected )
                        {  
                            console.log(selected.description.id)
                            $scope.leave.employee_id= selected.description.id;  
                        }

                        $http.get( '/getAllEmployee') 
                            .success( function ( response ) 
                            {  
                                $scope.employeeNames= response;   
                            })

                        $scope.addLeaveApp = function ( data )
                        {   
                            console.log(data)
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
                    templateUrl: "./public/javascripts/employee/leave/leaveAdd.html",
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
                console.log(data)
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