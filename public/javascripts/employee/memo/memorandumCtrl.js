hris
	.controller( "memorandumCtrl", [
		"$stateParams",
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "ngDialog",

		function controller( $stateParams, $scope, $http, $state, $timeout, ngDialog )
		{ 
            $scope.violation= {};
            violationIdShow();  

            function violationIdShow()
            {
                var id = $stateParams.empId; 
                $http.get( '/getViolationId/' + id )
                    .success( function ( response )
                    {  

                        if ( response.length > 0 )
                        {
                            $scope.violations = response;  
                        }  
                    });  
            }
            

            var userId = $stateParams.userId; 
            $http.get( '/getViolationId/' + userId )
                .success( function ( response )
                {  
                    if ( response.length > 0 )
                    {
                        $scope.profViolations = response;  
                    }  
                });
 
            $scope.edit = function ( data )
            {      
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/memo/memoAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                        $scope.violation= {}; 
                        $scope.violation.id= data.id;
                        $scope.employee_id= data.employee_id;
                        $scope.violation.memoNo= data.memoNo;
                        $scope.violation.memo= data.memo;  
                        $scope.violation.dateOfMemo= data.dateOfMemo;
                        $scope.violation.signedBy= data.signedBy;
                        $scope.violation.noOfOffense= data.noOfOffense;
                        $scope.violation.categoryOfOffense= data.categoryOfOffense;
                        $scope.violation.penalties= data.penalties;
                        $scope.violation.effectOnPenalties= data.effectOnPenalties;
                        $scope.violation.effectivePeriod= data.effectivePeriod;
                        $scope.violation.subject= data.subject;
                         
                        $scope.updateViolation = function ( data ) 
                        { 
                            $http.post( '/updateViolation', data ) 
                                .success( function ( response ) 
                            {  
                                $state.go( $state.current, {}, { reload: true }); 
                                $scope.$broadcast('angucomplete-alt:clearInput');
                                $scope.violation= {};
                                violationIdShow();
                            });
                        }   
                    }]
                });
            }

            $scope.addDialogViolation = function ( )
            {      
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/memo/memoAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.violation={}; 
                        
                        $scope.addViolation = function( data )
                        { 
                            data.employee_id= $stateParams.empId;
                            $http.post( '/addViolation', data )
                                .success( function( response )
                                { 
                                    $scope.violation = {};
                                    $state.go( $state.current, {}, { reload: true }); 
                                    $scope.$broadcast('angucomplete-alt:clearInput');
                                    violationIdShow();
                                })
                        }  
                    }]
                });
            }  

            $scope.deleteViolation = function( data )
            {  
                $http.delete( '/deleteViolation/' + data )
                    .success( function( response )
                    {  
                        console.log("hello")
                        violationIdShow();
                    })
            } 
		}
	])