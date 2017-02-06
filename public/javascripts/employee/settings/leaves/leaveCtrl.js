hris
	.controller( "leaveCtrl", [
		"$scope",
		"$state",
		"$http",
            "$stateParams",
		"$timeout",
            "ngDialog",

		function controller( $scope, $state, $http, $stateParams, $timeout, ngDialog  )
		{
                  $scope.leave= {}; 
			leaveShow();

			/*==============================================
						ADD RETRIEVE LEAVES
                  ================================================*/

                  $scope.addDialogLeave = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/leaves/leaveAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.leave={}; 
 
                              $scope.addLeave = function( data )
                              {
                                    $http.post( '/addLeave', data )
                                          .success( function ( response ) 
                                          { 
                                                $scope.leave = {};
                                                $state.go( $state.current, {}, { reload: true });
                                                leaveShow();
                                          });
                              }  
                          }]
                      });
                  }  

                  function leaveShow()
                  {
                        $http.get( '/getLeaveType' )
                              .success( function ( response )
                              { 
                                    console.log(response)
                                    $scope.leaveTypes= response;
                              }); 
                  }  

                  /*==============================================
      				              ADD RETRIEVE LEAVES WITH DAYS
                  ================================================*/
  
                  $scope.edit = function ( data )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/leaves/leaveAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.leave={}; 
                              $scope.leave.name= data.name;
                              $scope.leave.id= data.id; 
 
                              $scope.updateLeaveType = function( data )
                              {
                                    $http.post( '/updateLeaveType', data )
                                          .success( function ( response ) 
                                          { 
                                                $scope.leave = {};
                                                $state.go( $state.current, {}, { reload: true });
                                                leaveShow();
                                          });
                              } 
                          }]
                      });
                  }

                  $scope.deleteLeaveType = function( data )
                  {
                        $http.delete( '/deleteLeaveType/' + data )
                              .success( function ( response ) 
                              {  
                                    leaveShow();
                              });
                  }
		}
	])