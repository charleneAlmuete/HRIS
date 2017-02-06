hris
	.controller( "allowanceCtrl", [
		"$state",
		"$scope",
		"$http",
		"$timeout",
            "ngDialog",

		function controller( $state, $scope, $http, $timeout, ngDialog )
		{
                  $scope.allowance= {};
                  allowanceShow(); 

            			/*==============================================
            						          ADD ALLOWANCE
                  ================================================*/
 
                  function allowanceShow()
                  {
                        $http.get( '/getAllowance' )
                              .success( function ( response )
                              {
                                    $scope.allowances= response;
                                    
                              }); 
                  } 

                  /*==============================================
                                    EDIT ALLOWANCE
                  ================================================*/

                  $scope.addDialogAllowance = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/allowance/allowanceAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.allowance={}; 
 
                              $scope.addAllowance = function ( data )
                              { 
                                    $http.post( '/addAllowance', data )
                                          .success( function ( response )
                                          { 
                                                $state.go( $state.current, {}, { reload: true });
                                                data.id = response; 
                                                allowanceShow(); 
                                                $scope.allowance = {};
                                          });
                              }  

                          }]
                      });
                  } 

                  /*==============================================
                                    EDIT ALLOWANCE
                  ================================================*/

                  $scope.edit = function ( data )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/allowance/allowanceAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.allowance={}; 
                              $scope.allowance.id= data.id;
                              $scope.allowance.name= data.name;
 
                              $scope.updateAllowance = function ( data )
                              { 
                                    $http.post( '/updateAllowance', data )
                                          .success( function ( response )
                                          { 
                                                $state.go( $state.current, {}, { reload: true });
                                                data.id = response; 
                                                allowanceShow(); 
                                                $scope.allowance = {};
                                          });
                              }  
                          }]
                      });
                  } 

                  $scope.deleteAllowanceType = function ( data )
                  { 
                        $http.delete( '/deleteAllowanceType/' + data )
                              .success( function ( response )
                              {  
                                    allowanceShow();  
                              });
                  }  
		}
	])